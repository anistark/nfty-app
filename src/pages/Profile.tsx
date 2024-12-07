import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { PortfolioOverview } from "@/components/profile/PortfolioOverview";
import { ActivityLog } from "@/components/profile/ActivityLog";
import { RiskWarning } from "@/components/profile/RiskWarning";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  username: string | null;
  wallet_address: string | null;
  avatar_url: string | null;
  bio: string | null;
  twitter_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
}

interface SyntheticAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  collateral_amount: number;
  initial_price: number;
}

interface ActivityLog {
  id: string;
  action_type: string;
  details: any;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [assets, setAssets] = useState<SyntheticAsset[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeProfile = async () => {
      setIsLoading(true);
      
      // Check for wallet session instead of Supabase auth
      const walletSession = sessionStorage.getItem('wallet_session');
      
      if (!walletSession) {
        navigate('/');
        return;
      }

      // Create a basic profile with wallet address
      setProfile({
        id: walletSession,
        username: null,
        wallet_address: walletSession,
        avatar_url: null,
        bio: null,
        twitter_url: null,
        github_url: null,
        linkedin_url: null
      });

      await Promise.all([
        fetchAssets(walletSession),
        fetchActivityLogs(walletSession)
      ]);
      
      setIsLoading(false);
    };

    initializeProfile();
  }, [navigate]);

  const fetchAssets = async (walletAddress: string) => {
    const { data, error } = await supabase
      .from("synthetic_assets")
      .select("*")
      .eq("profile_id", walletAddress)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching assets:", error);
      return;
    }

    setAssets(data);
  };

  const fetchActivityLogs = async (walletAddress: string) => {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("profile_id", walletAddress)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching activity logs:", error);
      return;
    }

    setActivityLogs(data);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileInfo profile={profile} />
        <RiskWarning assets={assets} />
        <PortfolioOverview assets={assets} />
        <ActivityLog activityLogs={activityLogs} />
      </div>
    </div>
  );
};

export default Profile;