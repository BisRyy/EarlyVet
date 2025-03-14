"use client";

import { useState, useEffect } from "react";
import {
  Info,
  Calendar,
  Weight,
  Activity,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock livestock data
const mockLivestockData = {
  id: "COW-123",
  name: "Bessie",
  species: "Bovine",
  breed: "Holstein",
  gender: "Female",
  birthDate: "2019-03-15",
  weight: "650 kg",
  status: "Active",
  location: "North Pasture",
  lastCheckup: "2023-04-28",
  medicalHistory: [
    {
      date: "2023-04-28",
      condition: "Routine checkup",
      treatment: "Vaccinations updated",
      vet: "Dr. Sarah Johnson",
    },
    {
      date: "2023-02-10",
      condition: "Mild respiratory infection",
      treatment: "Antibiotics - 7 day course",
      vet: "Dr. Michael Chen",
    },
    {
      date: "2022-11-05",
      condition: "Hoof trimming",
      treatment: "Routine maintenance",
      vet: "Dr. Emily Rodriguez",
    },
  ],
  notes:
    "Bessie is a high-producing dairy cow with excellent health record. She calved in January 2023 and is currently in lactation.",
};

export default function LivestockDetails({
  livestockId = null,
  compact = false,
}) {
  const [livestockData, setLivestockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState("all");

  useEffect(() => {
    // Simulate API call to fetch livestock data
    const fetchLivestockData = async () => {
      try {
        // In a real app, you would fetch from your livestock service using the environment variables
        // const response = await fetch(`${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/${livestock?.id || 'COW-123'}`);
        // const data = await response.json();

        // For now, we'll use mock data
        const response = await fetch(
          `http://localhost:5001/api/livestock/${livestockId}`
        );
        const livestock = response.json();

        // If a specific livestock is provided, use its ID to "fetch" data
        // In a real app, this would be an actual API call with the livestock ID
        if (livestock) {
          // Simulate fetching specific livestock data
          // In a real app, you'd make an API call with the livestock ID
          setLivestockData({
            ...mockLivestockData,
            id: livestock.id,
            name: livestock.name,
            species: livestock.species,
            breed: livestock.breed,
            gender: livestock.gender,
          });
        } else {
          setLivestockData(mockLivestockData);
        }
      } catch (error) {
        console.error("Error fetching livestock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivestockData();
  }, [livestockId]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "all" : section);
  };

  if (loading) {
    return (
      <div className={`p-4 ${compact ? "max-h-60 overflow-auto" : ""}`}>
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Separator />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!livestockData) {
    return (
      <div className={`p-4 ${compact ? "max-h-60 overflow-auto" : ""}`}>
        <p className="text-muted-foreground">No livestock data available.</p>
      </div>
    );
  }

  return (
    <div className={`${compact ? "max-h-60 overflow-auto" : ""}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{livestockData.name}</h3>
          <Badge variant="outline">{livestockData.id}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {livestockData.breed} {livestockData.species} • {livestockData.gender}
        </p>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Birth Date</p>
                <p className="text-sm font-medium">
                  {new Date(livestockData.birthDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="text-sm font-medium">{livestockData.weight}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium">{livestockData.status}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{livestockData.location}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <Collapsible open={openSection === "all" || openSection === "medical"}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between p-0 h-auto"
              onClick={() => toggleSection("medical")}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium">Medical History</span>
              </div>
              {openSection === "medical" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-3">
              {livestockData.medicalHistory.map((record, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {record.condition}
                    </p>
                    <p className="text-xs mt-1">{record.treatment}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vet: {record.vet}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="my-4" />

        <Collapsible open={openSection === "all" || openSection === "notes"}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between p-0 h-auto"
              onClick={() => toggleSection("notes")}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium">Notes</span>
              </div>
              {openSection === "notes" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <p className="text-sm">{livestockData.notes}</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
