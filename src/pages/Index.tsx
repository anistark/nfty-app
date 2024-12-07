import { NFTTable } from "@/components/NFTTable";
import { LiquidityPoolCard } from "@/components/LiquidityPoolCard";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Target, Users, BarChart3, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const generateMockPerformanceData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}d`,
    value: Math.random() * 100 + 50,
  }));
};

const topNFTs = [
  { name: "Bored Apes", performance: "+45.2%", volume: "1,234 ETH" },
  { name: "CryptoPunks", performance: "+38.7%", volume: "987 ETH" },
  { name: "Azuki", performance: "+32.1%", volume: "756 ETH" },
  { name: "Doodles", performance: "+28.4%", volume: "543 ETH" },
  { name: "Art Blocks", performance: "+25.9%", volume: "432 ETH" },
];

const liquidityPools = [
  { name: "Blue Chip NFT Pool", tvl: "$12.5M", apr: "8.2%", utilization: 75 },
  { name: "Gaming NFT Index", tvl: "$8.3M", apr: "12.4%", utilization: 65 },
  { name: "Art Collection Pool", tvl: "$6.7M", apr: "9.8%", utilization: 82 },
  { name: "Metaverse Index", tvl: "$5.2M", apr: "11.3%", utilization: 58 },
];

const features = [
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Secure Investment",
    description: "Your assets are protected by industry-leading security measures and smart contract audits."
  },
  {
    icon: <Zap className="w-12 h-12 text-primary" />,
    title: "Instant Liquidity",
    description: "Access your investments anytime with our efficient liquidity pools."
  },
  {
    icon: <Target className="w-12 h-12 text-primary" />,
    title: "Curated Collections",
    description: "Expertly selected NFT collections to maximize your investment potential."
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-primary" />,
    title: "Advanced Analytics",
    description: "Make informed decisions with our comprehensive market analysis tools."
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Community Driven",
    description: "Join a thriving community of NFT investors and enthusiasts."
  },
  {
    icon: <Lock className="w-12 h-12 text-primary" />,
    title: "Risk Management",
    description: "Sophisticated risk management tools to protect your portfolio."
  }
];

const Index = () => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("/images/background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-24 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20 flex flex-row items-center w-screen">
          <div className="w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff00ff] to-[#00ffff]">
              NFTy 50
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto mb-12">
              Make Smarter Investments with Top NFT Index Funds
            </p>
          </div>
          <div className="w-1/2">
            {/* Featured Asset */}
            <Link to="/synth-token">
              <Card className="max-w-md mx-auto p-6 glass hover:scale-105 transition-transform duration-300 cursor-pointer group animate-fade-in">
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src="/images/punk.jpeg"
                    alt="CryptoPunk NFT"
                    className="w-72 h-72 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-2xl font-semibold">$PUNK</h3>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Why NFTy 50 Section */}
        <section className="mb-20 py-16 glass rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Why Choose NFTy 50?
            </h2>
            <p className="text-xl text-white mb-12">
              NFTy 50 revolutionizes NFT investing by providing a secure, efficient, and user-friendly platform for both newcomers and experienced investors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 glass hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Performing NFTs */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white">Top Performing NFTs</h2>
          <NFTTable nfts={topNFTs} />
        </section>

        {/* Liquidity Pools */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white">Active Liquidity Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liquidityPools.map((pool) => (
              <LiquidityPoolCard
                key={pool.name}
                {...pool}
                performanceData={generateMockPerformanceData()}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-20 py-16 glass rounded-3xl text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Start Your NFT Investment Journey Today
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of investors who trust NFTy 50 for their NFT investments. Create an account now and access our full suite of investment tools.
            </p>
            <Link to="/profile">
              <Button size="lg" className="text-lg px-8 py-6 animate-pulse hover:animate-none">
                Create Account <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;