"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import ProtectedRoute from "@/components/protected-route";
import { SensorTable } from "@/components/sensors/sensor-table";
import { SensorForm } from "@/components/sensors/sensor-form";
import { ReadingsChart } from "@/components/sensors/readings-chart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sensor, SensorReading, CreateSensorData } from "@/lib/types";
import { getSensors, createSensor, getSensorReadings } from "@/lib/sensors-api";
import { useToast } from "@/components/ui/use-toast";

export default function SensorsPage() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [readingsOpen, setReadingsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchSensors();
    }
  }, [token]);

  async function fetchSensors() {
    try {
      const data = await getSensors();
      setSensors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sensors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: CreateSensorData) {
    try {
      const newSensor = await createSensor(data);
      setSensors([...sensors, newSensor]);
      setFormOpen(false);
      toast({
        title: "Success",
        description: "Sensor added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add sensor",
        variant: "destructive",
      });
    }
  }

  async function handleViewReadings(sensor: Sensor) {
    setSelectedSensor(sensor);
    setReadingsOpen(true);
    try {
      const data = await getSensorReadings(sensor._id);
      setReadings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sensor readings",
        variant: "destructive",
      });
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Sensor Management</h1>
          <Button onClick={() => setFormOpen(true)}>Add Sensor</Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <SensorTable sensors={sensors} onViewReadings={handleViewReadings} />
        )}

        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sensor</DialogTitle>
            </DialogHeader>
            <SensorForm
              onSubmit={handleCreate}
              onCancel={() => setFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Sheet open={readingsOpen} onOpenChange={setReadingsOpen}>
          <SheetContent className="w-[600px] sm:w-[800px]">
            <SheetHeader>
              <SheetTitle>Sensor Readings: {selectedSensor?.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ReadingsChart readings={readings} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </ProtectedRoute>
  );
}
