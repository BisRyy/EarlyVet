"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import VetHeader from "./components/vet-header";
import VetDashboard from "./components/vet-dashboard";
import AppointmentRequests from "./components/appointment-requests";
import PatientList from "./components/patient-list";
import VetChatInterface from "./components/vet-chat-interface";
import VetCallInterface from "./components/vet-call-interface";
import VetSchedule from "./components/vet-schedule";
import LivestockMedicalRecord from "./components/livestock-medical-record";

export default function VetPortalLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleAcceptAppointment = (appointment) => {
    toast({
      title: "Appointment Accepted",
      description: `You've accepted the appointment with ${appointment.farmerName} for ${appointment.livestockName}.`,
    });
  };

  const handleDeclineAppointment = (appointment) => {
    toast({
      title: "Appointment Declined",
      description: `You've declined the appointment with ${appointment.farmerName} for ${appointment.livestockName}.`,
    });
  };

  const handleStartChat = (farmer, livestock) => {
    setSelectedFarmer(farmer);
    setSelectedLivestock(livestock);
    const chatId = `chat-${farmer.id}-${livestock.id}`;
    setActiveChatId(chatId);
    setActiveTab("chat");
  };

  const handleStartCall = (farmer, livestock, isVideo = true) => {
    setSelectedFarmer(farmer);
    setSelectedLivestock(livestock);
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

  const handleViewMedicalRecord = (livestock) => {
    setSelectedLivestock(livestock);
    setShowMedicalRecord(true);
  };

  const handleCloseMedicalRecord = () => {
    setShowMedicalRecord(false);
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
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="appointments">Requests</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="chat" disabled={!activeChatId}>
                Chat
              </TabsTrigger>
              <TabsTrigger value="call" disabled={!inCall}>
                Call
              </TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent
              value="dashboard"
              className="h-full overflow-auto scrollbar-thin"
            >
              <VetDashboard
                onViewAppointments={() => setActiveTab("appointments")}
                onViewPatients={() => setActiveTab("patients")}
                onViewSchedule={() => setActiveTab("schedule")}
              />
            </TabsContent>

            <TabsContent
              value="appointments"
              className="h-full overflow-auto scrollbar-thin"
            >
              <AppointmentRequests
                onAccept={handleAcceptAppointment}
                onDecline={handleDeclineAppointment}
                onViewMedicalRecord={handleViewMedicalRecord}
              />
            </TabsContent>

            <TabsContent
              value="patients"
              className="h-full overflow-auto scrollbar-thin"
            >
              <PatientList
                onStartChat={handleStartChat}
                onStartCall={handleStartCall}
                onViewMedicalRecord={handleViewMedicalRecord}
              />
            </TabsContent>

            <TabsContent
              value="chat"
              className="h-full overflow-auto scrollbar-thin"
            >
              <VetChatInterface
                farmer={selectedFarmer}
                livestock={selectedLivestock}
                chatId={activeChatId}
                onStartCall={handleStartCall}
                onViewMedicalRecord={() => setShowMedicalRecord(true)}
              />
            </TabsContent>

            <TabsContent
              value="call"
              className="h-full overflow-auto scrollbar-thin"
            >
              <VetCallInterface
                farmer={selectedFarmer}
                livestock={selectedLivestock}
                onEndCall={handleEndCall}
                inCall={inCall}
                onViewMedicalRecord={() => setShowMedicalRecord(true)}
              />
            </TabsContent>

            <TabsContent
              value="schedule"
              className="h-full overflow-auto scrollbar-thin"
            >
              <VetSchedule
                onStartChat={handleStartChat}
                onStartCall={handleStartCall}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Right sidebar for medical records - hidden on mobile */}
      {!isMobile && showMedicalRecord && selectedLivestock && (
        <div className="w-96 border-l overflow-auto">
          <LivestockMedicalRecord
            livestock={selectedLivestock}
            onClose={handleCloseMedicalRecord}
          />
        </div>
      )}
    </div>
  );
}
