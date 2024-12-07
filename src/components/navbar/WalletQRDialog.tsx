import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

interface WalletQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metamaskDeepLink: string;
}

export const WalletQRDialog = ({ 
  open, 
  onOpenChange, 
  metamaskDeepLink 
}: WalletQRDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect with MetaMask Mobile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
          <QRCodeSVG value={metamaskDeepLink} size={256} />
          <p className="text-sm text-muted-foreground text-center">
            Scan this QR code with your phone's camera to connect MetaMask Mobile
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.href = metamaskDeepLink}
            className="w-full"
          >
            Open MetaMask Mobile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};