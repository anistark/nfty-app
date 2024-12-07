import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export function PoolChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [openAiKey, setOpenAiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { poolId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = sessionStorage.getItem('openai_key');
    if (savedKey) {
      setOpenAiKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSetApiKey = () => {
    if (!openAiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    sessionStorage.setItem('openai_key', openAiKey);
    setIsKeySet(true);
    toast({
      title: "Success",
      description: "API key has been saved to your browser session",
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !isKeySet) return;

    const userMessage = { type: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/functions/v1/chat-with-pool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          prompt: input.trim(),
          openAiKey,
          poolId,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage = {
        type: 'bot' as const,
        content: data.response,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the chatbot. Please try again.",
        variant: "destructive",
      });
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Pool Assistant</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {!isKeySet ? (
            <div className="p-4 space-y-4">
              <Alert>
                <AlertDescription>
                  Your OpenAI API key will be stored securely in your browser's session storage.
                  It will be cleared when you close your browser. We never store your API key on our servers.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                />
                <Button onClick={handleSetApiKey} className="w-full">
                  Set API Key
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.type === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.type === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border rounded-md p-2 h-10 min-h-[40px] max-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={1}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="h-10 w-10"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}