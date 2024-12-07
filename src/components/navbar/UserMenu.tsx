import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserMenu = ({ 
  account,
  setAccount 
}: { 
  account: string;
  setAccount: (address: string | null) => void;
}) => {
  const { toast } = useToast();

  const handleDisconnect = () => {
    setAccount(null);
    sessionStorage.removeItem('wallet_session');
    toast({
      title: "Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src="https://diffusionart.co/wp-content/uploads/2023/04/Character-Anime-Manga-NFT-Profile-Pictures6.png" 
              alt="Profile" 
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/profile">{`${account.slice(0, 6)}...${account.slice(-4)}` || "Profile"}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleDisconnect}
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};