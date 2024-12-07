import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { WalletConnect } from "./navbar/WalletConnect";
import { UserMenu } from "./navbar/UserMenu";

export const Navbar = () => {
  const [account, setAccount] = useState<string | null>(null);

  // Check session storage on component mount
  useEffect(() => {
    const checkSession = () => {
      const sessionData = sessionStorage.getItem('wallet_session');
      if (sessionData) {
        const { address, expiry } = JSON.parse(sessionData);
        if (new Date(expiry) > new Date()) {
          setAccount(address);
        } else {
          sessionStorage.removeItem('wallet_session');
        }
      }
    };

    checkSession();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            <img src="/logo.png" alt="NFTy 50" className="h-32" />
          </Link>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
            {account ? (
              <UserMenu account={account} setAccount={setAccount} />
            ) : (
              <WalletConnect account={account} setAccount={setAccount} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};