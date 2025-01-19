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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { DiseasePrediction, LivestockDetails } from "@/lib/types";
import { SensorReading } from "@/lib/types";
import {
  generatePrediction,
  getLivestockSensorData,
  getSensorReadings,
} from "@/lib/sensors-api";
import { getLivestockById } from "@/lib/livestock-api";

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

export default function LivestockDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const { toast } = useToast();
  const [livestock, setLivestock] = useState<LivestockDetails | null>(null);
  const [readings, setReadings] = useState<{
    temperature: SensorReading[];
    heartRate: SensorReading[];
    activity: SensorReading[];
  }>(dummyReadings);
  const [prediction, setPrediction] = useState<DiseasePrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    if (token && id) {
      fetchLivestockDetails();
      const interval = setInterval(fetchSensorReadings, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [token, id]);

  async function fetchLivestockDetails() {
    try {
      const response = await getLivestockById(id as string);
      setLivestock(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch livestock details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchSensorReadings() {
    try {
      const response = await getLivestockSensorData(id as string);
      setReadings(response);
    } catch (error) {
      console.error("Failed to fetch sensor readings");
    }
  }

  async function handleGeneratePrediction() {
    setPredicting(true);
    try {
      const data = await generatePrediction(id as string, token!);
      setPrediction(data);
      toast({
        title: "Success",
        description: "Disease prediction generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prediction",
        variant: "destructive",
      });
    } finally {
      setPredicting(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 space-y-8">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (!livestock) {
    return <div>Livestock not found</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{livestock.name}</h1>
            <p className="text-muted-foreground">
              ID: {livestock._id} • Type: {livestock.type} • Age:{" "}
              {livestock.dateOfBirth} years
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

        {/* <MedicalHistory livestock={livestock} /> */}
      </div>
    </ProtectedRoute>
  );
}
