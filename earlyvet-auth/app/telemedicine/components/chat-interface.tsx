"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Paperclip, Video, Phone, Info } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import LivestockDetails from "./livestock-details";

// Mock chat data
const initialMessages = [
  {
    id: 1,
    sender: "vet",
    content: "Hello! How can I help you with your livestock today?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    sender: "farmer",
    content:
      "Hi Dr. Johnson, I have a cow that's showing signs of lameness in her front right leg.",
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 3,
    sender: "vet",
    content:
      "I'm sorry to hear that. Can you tell me when you first noticed the lameness and if there are any other symptoms?",
    timestamp: new Date(Date.now() - 3400000).toISOString(),
  },
  {
    id: 4,
    sender: "farmer",
    content:
      "I noticed it yesterday morning. She's also been less interested in food and seems to have a slight fever.",
    timestamp: new Date(Date.now() - 3300000).toISOString(),
  },
  {
    id: 5,
    sender: "vet",
    content:
      "Thank you for that information. Based on what you're describing, it could be a hoof infection or possibly an injury. I'd like to see some photos of the affected leg and hoof if possible.",
    timestamp: new Date(Date.now() - 3200000).toISOString(),
  },
];

export default function ChatInterface({ vet, livestock, chatId, onStartCall }) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showMobileDetails, setShowMobileDetails] = useState(false);
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
      sender: "farmer",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate vet response after a delay
    setTimeout(() => {
      const vetResponse = {
        id: messages.length + 2,
        sender: "vet",
        content:
          "Thank you for that information. I'll need to take a closer look. Could you share more details or perhaps a photo of the affected area?",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, vetResponse]);
    }, 3000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!vet) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">
          Please select a veterinarian to start a chat.
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
            <AvatarImage src={vet.image} alt={vet.name} />
            <AvatarFallback>
              {vet.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Dr. {vet.name}</h3>
            <p className="text-xs text-muted-foreground">{vet.specialty}</p>
            {livestock && (
              <p className="text-xs text-primary">
                Discussing: {livestock.name} ({livestock.id})
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onStartCall(false)}
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
                  onClick={() => onStartCall(true)}
                >
                  <Video className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Video Call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isMobile && livestock && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowMobileDetails(!showMobileDetails)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Livestock Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Mobile livestock details panel */}
      {isMobile && showMobileDetails && livestock && (
        <div className="border-b">
          <LivestockDetails livestock={livestock.id} compact />
        </div>
      )}

      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "farmer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "farmer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "farmer"
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
