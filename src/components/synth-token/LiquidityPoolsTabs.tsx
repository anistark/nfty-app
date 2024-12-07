import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export const LiquidityPoolsTabs = () => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active Pools</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming Pools</TabsTrigger>
        <TabsTrigger value="closed">Closed Pools</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="glass cursor-pointer hover:scale-[1.02] transition-all"
            onClick={() => navigate('/pools/punk-eth-pool')}
          >
            <CardHeader>
              <CardTitle>PUNK-ETH Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TVL</span>
                  <span>$5.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APR</span>
                  <span className="text-primary">12.4%</span>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Utilization</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="upcoming">
        <Card className="glass">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No upcoming pools</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="closed">
        <Card className="glass">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No closed pools</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};