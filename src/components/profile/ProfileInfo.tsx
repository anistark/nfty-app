import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileInfoProps {
  profile: {
    id: string;
    username: string | null;
    wallet_address: string | null;
    avatar_url: string | null;
    bio: string | null;
    twitter_url: string | null;
    github_url: string | null;
    linkedin_url: string | null;
  };
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://diffusionart.co/wp-content/uploads/2023/04/Character-Anime-Manga-NFT-Profile-Pictures6.png"
              alt="Profile"
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
          
          {profile.wallet_address && (
            <div className="text-center">
              <p className="text-sm font-medium">👋</p>
              <p className="text-lg text-white">
                {JSON.parse(profile.wallet_address).address}
              </p>
            </div>
          )}

          <div className="w-full max-w-sm space-y-4">
            {profile.username && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <p className="text-sm">{profile.username}</p>
              </div>
            )}
            
            {profile.bio && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <p className="text-sm">{profile.bio}</p>
              </div>
            )}

            {profile.twitter_url && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter</label>
                <a 
                  href={profile.twitter_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {profile.twitter_url}
                </a>
              </div>
            )}

            {profile.github_url && (
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub</label>
                <a 
                  href={profile.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {profile.github_url}
                </a>
              </div>
            )}

            {profile.linkedin_url && (
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn</label>
                <a 
                  href={profile.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {profile.linkedin_url}
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};