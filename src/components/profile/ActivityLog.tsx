import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityLog {
  id: string;
  action_type: string;
  details: any;
  created_at: string;
}

interface ActivityLogProps {
  activityLogs: ActivityLog[];
}

export const ActivityLog = ({ activityLogs }: ActivityLogProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{log.action_type}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(log.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};