"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RoomPage from "@/app/room/page";

export default function VetCallInterface({
  farmer,
  livestock,
  onEndCall,
  inCall,
  onViewMedicalRecord,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState(
    inCall ? "connected" : "connecting"
  );
  const { toast } = useToast();

  useEffect(() => {
    let timer;

    if (inCall) {
      // Simulate connecting delay
      if (callStatus === "connecting") {
        timer = setTimeout(() => {
          setCallStatus("connected");
          toast({
            title: "Call Connected",
            description: `You are now connected with ${farmer.name}.`,
          });
        }, 2000);
      }

      // Start call duration timer
      if (callStatus === "connected") {
        timer = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [inCall, callStatus, farmer, toast]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: isMuted
        ? "Others can now hear you."
        : "Others cannot hear you.",
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Video Turned Off" : "Video Turned On",
      description: isVideoOn
        ? "Others cannot see you."
        : "Others can now see you.",
    });
  };

  const handleEndCall = () => {
    setCallStatus("disconnected");
    setCallDuration(0);
    onEndCall();
  };

  if (!farmer || !livestock) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">
          Please select a patient to start a call.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 flex flex-col items-center justify-center relative">
        {/* Main video area */}
        <RoomPage />

        {/* Medical record button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-white/90"
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
      </div>
    </div>
  );
}
