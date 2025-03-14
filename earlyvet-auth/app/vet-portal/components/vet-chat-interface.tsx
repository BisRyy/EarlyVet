"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Paperclip, Video, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock chat data
const initialMessages = [
  {
    id: 1,
    sender: "farmer",
    content:
      "Hello Dr. Johnson, I'm concerned about my cow Bessie. She's showing signs of lameness in her front right leg.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    sender: "vet",
    content:
      "Hello Mr. Doe. I'm sorry to hear about Bessie. When did you first notice the lameness and are there any other symptoms?",
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 3,
    sender: "farmer",
    content:
      "I noticed it yesterday morning. She's also been less interested in food and seems to have a slight fever.",
    timestamp: new Date(Date.now() - 3400000).toISOString(),
  },
  {
    id: 4,
    sender: "vet",
    content:
      "Thank you for that information. Based on what you're describing, it could be a hoof infection or possibly an injury. I'd like to see some photos of the affected leg and hoof if possible.",
    timestamp: new Date(Date.now() - 3300000).toISOString(),
  },
  {
    id: 5,
    sender: "farmer",
    content:
      "I'll take some photos and send them shortly. Is there anything I should do in the meantime?",
    timestamp: new Date(Date.now() - 3200000).toISOString(),
  },
];

export default function VetChatInterface({
  farmer,
  livestock,
  chatId,
  onStartCall,
  onViewMedicalRecord,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: "vet",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate farmer response after a delay
    setTimeout(() => {
      const farmerResponse = {
        id: messages.length + 2,
        sender: "farmer",
        content:
          "Thank you for the advice, Doctor. I'll monitor her condition and follow your recommendations.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, farmerResponse]);
    }, 5000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!farmer || !livestock) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">
          Please select a patient to start a chat.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="px-4 py-3 border-b flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={farmer.image} alt={farmer.name} />
            <AvatarFallback>
              {farmer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{farmer.name}</h3>
            <p className="text-xs text-muted-foreground">{farmer.farm}</p>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs mr-2">
                {livestock.species}
              </Badge>
              <p className="text-xs text-primary">
                {livestock.name} ({livestock.id})
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onViewMedicalRecord}
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Medical Record</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onStartCall(farmer, livestock, false)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Audio Call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onStartCall(farmer, livestock, true)}
                >
                  <Video className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Video Call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Chat messages */}
      <ScrollArea
        className="flex-1 p-4 scrollbar-thin"
        style={{ height: "calc(100vh - 180px)" }}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "vet" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "vet"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "vet"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
