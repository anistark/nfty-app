import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        
        <Card className="glass max-w-2xl mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input className="glass" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input className="glass" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea className="glass" placeholder="Your message" rows={6} />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Contact;