import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  poolName: z.string().min(3, "Pool name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  platformFee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid percentage"),
  managementFee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid percentage"),
  performanceFee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid percentage"),
  minimumInvestment: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
  lockupPeriod: z.string().regex(/^\d+$/, "Enter number of days"),
});

export type PoolFormData = z.infer<typeof formSchema>;

interface PoolConfigurationFormProps {
  onSubmit: (values: PoolFormData) => Promise<void>;
  defaultValues?: Partial<PoolFormData>;
}

export const PoolConfigurationForm = ({ onSubmit, defaultValues }: PoolConfigurationFormProps) => {
  const form = useForm<PoolFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poolName: "",
      description: "",
      platformFee: "2.5",
      managementFee: "2",
      performanceFee: "20",
      minimumInvestment: "1000",
      lockupPeriod: "30",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Pool Configuration</CardTitle>
            <CardDescription>
              Set up your liquidity pool parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="poolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pool Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pool name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your pool strategy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="platformFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Fee (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Fee charged by the platform
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="managementFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Management Fee (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Annual management fee
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="performanceFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Performance Fee (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Fee on profits
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minimumInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Investment (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lockupPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lock-up Period (days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Create Pool
        </Button>
      </form>
    </Form>
  );
};