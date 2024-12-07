import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { WalletQRDialog } from "./WalletQRDialog";
import { signInWithWallet } from "@/utils/walletAuth";
import { supabase } from "@/integrations/supabase/client"; // Added this import

export const WalletConnect = ({ 
  account, 
  setAccount 
}: { 
  account: string | null;
  setAccount: (address: string | null) => void;
}) => {
  const { toast } = useToast();
  const [showQRCode, setShowQRCode] = useState(false);
  const metamaskDeepLink = `https://metamask.app.link/dapp/${window.location.host}`;

  const handleWalletConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setAccount(address);
        
        const { success, error } = await signInWithWallet(address);
        
        if (success) {
          toast({
            title: "Success",
            description: "Successfully authenticated with wallet",
          });
        } else {
          throw error;
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setShowQRCode(true);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        const newAccount = accounts[0] || null;
        setAccount(newAccount);
        
        if (newAccount) {
          const { success } = await signInWithWallet(newAccount);
          if (!success) {
            await supabase.auth.signOut(); // Fixed: Added supabase import
            sessionStorage.removeItem('wallet_session');
          }
        } else {
          await supabase.auth.signOut(); // Fixed: Added supabase import
          sessionStorage.removeItem('wallet_session');
        }
      });
    }
  }, []);

  return (
    <>
      <Button onClick={handleWalletConnect}>Connect Wallet</Button>
      <WalletQRDialog 
        open={showQRCode} 
        onOpenChange={setShowQRCode}
        metamaskDeepLink={metamaskDeepLink}
      />
    </>
  );
};