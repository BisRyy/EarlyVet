"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import TelemedicineHeader from "./components/telemedicine-header";
import VetDirectory from "./components/vet-directory";
import ChatInterface from "./components/chat-interface";
import CallInterface from "./components/call-interface";
import ConsultationHistory from "./components/consultation-history";
import LivestockDetails from "./components/livestock-details";
import LivestockSelector from "./components/livestock-selector";
import MyVets from "./components/my-vets";
import WelcomeScreen from "./components/welcome-screen";

export default function TelemedicineLayout() {
  const [activeTab, setActiveTab] = useState("welcome");
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [myVets, setMyVets] = useState([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleFindVets = () => {
    setActiveTab("directory");
  };

  const handleVetSelect = (vet) => {
    setSelectedVet(vet);
    setActiveTab("livestock-select");
    toast({
      title: "Vet Selected",
      description: `You've selected Dr. ${vet.name}. Now please select a livestock.`,
    });
  };

  const handleLivestockSelect = (livestock) => {
    setSelectedLivestock(livestock);
    toast({
      title: "Livestock Selected",
      description: `You've selected ${livestock.name}. You can now request an appointment.`,
    });
  };

  const handleRequestAppointment = () => {
    // In a real app, this would send an appointment request to the backend
    toast({
      title: "Appointment Requested",
      description: `Your appointment request with Dr. ${selectedVet.name} for ${selectedLivestock.name} has been sent.`,
    });

    // Simulate vet accepting the appointment after a delay
    setTimeout(() => {
      const newVet = { ...selectedVet, appointmentStatus: "accepted" };
      setMyVets((prev) => [
        ...prev.filter((v) => v.id !== selectedVet.id),
        newVet,
      ]);

      toast({
        title: "Appointment Accepted",
        description: `Dr. ${selectedVet.name} has accepted your appointment request. You can now start communicating.`,
      });

      setActiveTab("my-vets");
    }, 3000);
  };

  const handleStartChat = (vet) => {
    // In a real app, this would create a new chat session in the backend
    const chatId = `chat-${Date.now()}`;
    setSelectedVet(vet);
    setActiveChatId(chatId);
    setActiveTab("chat");
  };

  const handleStartCall = (isVideo) => {
    setInCall(true);
    setActiveTab("call");
  };

  const handleEndCall = () => {
    setInCall(false);
    toast({
      title: "Call Ended",
      description: "Your call has been ended successfully.",
    });
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <div className="px-4 py-2 border-b">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="welcome">Home</TabsTrigger>
              <TabsTrigger value="my-vets">My Vets</TabsTrigger>
              <TabsTrigger value="directory">Find Vets</TabsTrigger>
              <TabsTrigger value="chat" disabled={!activeChatId}>
                Chat
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <TabsContent value="welcome" className="h-full">
              <WelcomeScreen onFindVets={handleFindVets} />
            </TabsContent>

            <TabsContent value="my-vets" className="h-full">
              <MyVets
                vets={myVets}
                onStartChat={handleStartChat}
                onStartCall={handleStartCall}
              />
            </TabsContent>

            <TabsContent value="directory" className="h-full">
              <VetDirectory
                onVetSelect={handleVetSelect}
                selectedVet={selectedVet}
              />
            </TabsContent>

            <TabsContent value="livestock-select" className="h-full">
              <LivestockSelector
                onLivestockSelect={handleLivestockSelect}
                selectedLivestock={selectedLivestock}
                selectedVet={selectedVet}
                onRequestAppointment={handleRequestAppointment}
              />
            </TabsContent>

            <TabsContent value="chat" className="h-full">
              <ChatInterface
                vet={selectedVet}
                livestock={selectedLivestock}
                chatId={activeChatId}
                onStartCall={handleStartCall}
              />
            </TabsContent>

            <TabsContent value="call" className="h-full">
              <CallInterface
                vet={selectedVet}
                livestock={selectedLivestock}
                onEndCall={handleEndCall}
                inCall={inCall}
              />
            </TabsContent>

            <TabsContent value="history" className="h-full">
              <ConsultationHistory
                onViewChat={(chatId, vet, livestock) => {
                  setActiveChatId(chatId);
                  setSelectedVet(vet);
                  setSelectedLivestock(livestock);
                  setActiveTab("chat");
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Right sidebar for livestock details - hidden on mobile */}
      {!isMobile &&
        selectedLivestock &&
        (activeTab === "chat" || activeTab === "call") && (
          <div className="w-80 border-l overflow-auto">
            <LivestockDetails livestock={selectedLivestock.id} />
          </div>
        )}
    </div>
  );
}
