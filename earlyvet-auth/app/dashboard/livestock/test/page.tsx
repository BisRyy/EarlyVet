"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import ProtectedRoute from "@/components/protected-route";
import { VitalStats } from "@/components/livestock/vital-stats";
import { MedicalHistory } from "@/components/livestock/medical-history";
import { PredictionCard } from "@/components/livestock/prediction-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LivestockDetails } from "@/lib/types";

// Dummy data for demonstration
const dummyLivestock : LivestockDetails = {
  _id: "l123",
  name: "Bessie",
  type: "cow",
  age: 4,
  breed: "Holstein Friesian",
  weight: 680,
  dateOfBirth: "2019-05-15",
  collarId: "COL456",
  healthStatus: "healthy",
  ownerId: "own789",
  vaccinationHistory: [
    {
      name: "Bovine Viral Diarrhea (BVD)",
      date: "2023-11-15",
    },
    {
      name: "Infectious Bovine Rhinotracheitis (IBR)",
      date: "2023-08-20",
    },
    {
      name: "Foot and Mouth Disease",
      date: "2023-03-10",
    },
  ],
  medicalHistory: [
    {
      condition: "Mild Fever",
      date: "2023-12-01",
      treatment: "Administered antipyretic medication",
    },
    {
      condition: "Routine Check-up",
      date: "2023-09-15",
      treatment: "All vital signs normal",
    },
    {
      condition: "Minor Hoof Issue",
      date: "2023-07-22",
      treatment: "Hoof trimming and topical medication",
    },
  ],
};

const dummyReadings = {
  temperature: Array.from({ length: 24 }, (_, i) => ({
    _id: `t${i}`,
    sensorId: "s789",
    value: 38.5 + Math.sin(i / 3) * 0.3,
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    type: "temperature",
  })),
  heartRate: Array.from({ length: 24 }, (_, i) => ({
    _id: `h${i}`,
    sensorId: "s790",
    value: 65 + Math.sin(i / 2) * 5,
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    type: "heart-rate",
  })),
  activity: Array.from({ length: 24 }, (_, i) => ({
    _id: `a${i}`,
    sensorId: "s791",
    value: 250 + Math.sin(i / 4) * 100,
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    type: "activity",
  })),
};

const dummyPrediction = {
  id: "p123",
  livestockId: "l123",
  disease: "Subclinical Mastitis",
  probability: 0.75,
  symptoms: [
    "Slightly elevated body temperature",
    "Reduced milk production",
    "Minor changes in milk composition",
    "Subtle changes in feeding behavior",
  ],
  recommendedActions: [
    "Schedule immediate veterinary examination",
    "Isolate from healthy cattle",
    "Begin monitoring milk quality daily",
    "Prepare for potential antibiotic treatment",
  ],
  timestamp: new Date().toISOString(),
};

export default function LivestockDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const { toast } = useToast();
  const [livestock, setLivestock] = useState(dummyLivestock);
  const [readings, setReadings] = useState(dummyReadings);
  const [prediction, setPrediction] = useState<any>(null);
  const [predicting, setPredicting] = useState(false);

  async function handleGeneratePrediction() {
    setPredicting(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPrediction(dummyPrediction);
    setPredicting(false);
    toast({
      title: "Success",
      description: "Disease prediction generated successfully",
    });
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{livestock.name}</h1>
            <p className="text-muted-foreground">
              ID: {livestock._id} • Type: {livestock.type} • Age:{" "}
              {livestock.age} years
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleGeneratePrediction}
            disabled={predicting}
          >
            {predicting
              ? "Generating Prediction..."
              : "Generate Disease Prediction"}
          </Button>
        </div>

        <VitalStats readings={readings} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Breed</div>
                  <div className="font-medium">{livestock.breed}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-medium">{livestock.weight} kg</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Date of Birth
                  </div>
                  <div className="font-medium">
                    {new Date(livestock.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Collar ID</div>
                  <div className="font-medium">{livestock.collarId}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <PredictionCard prediction={prediction} />
        </div>

        <MedicalHistory livestock={livestock} />
      </div>
    </ProtectedRoute>
  );
}
