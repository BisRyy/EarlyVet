"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorReading } from "@/lib/types";
import {
  Heart,
  ThermometerSun,
  Activity,
  Paintbrush,
  LocateIcon,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";

interface VitalStatsProps {
  readings: SensorReading | null;
}

export function VitalStats({ readings }: VitalStatsProps) {
  // if (!readings) {
  //   return null;
  // }

  const stats = [
    {
      title: "Temperature",
      value: readings?.temperature || 0,
      unit: "°C",
      icon: ThermometerSun,
      color: "text-orange-500",
    },
    {
      title: "Heart Rate",
      value: readings?.heartRate || 0,
      unit: "bpm",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Activity Level",
      value: readings?.activity || 0,
      unit: "steps/hr",
      icon: Activity,
      color: "text-blue-500",
    },
    {
      title: "Blood Pressure",
      value: readings?.bloodPressure || 0,
      unit: "mmHg",
      icon: Paintbrush,
      color: "text-red-500",
    },
    {
      title: "Location",
      value: readings?.location || "Unknown",
      unit: "",
      icon: LocateIcon,
      color: "text-red-500",
    },
    {
      title: "Last Reading",
      value: new Date(readings?.timestamp || "").toLocaleString(),
      unit: "",
      icon: Timer,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-2xl font-bold"
            >
              {stat.value} {stat.unit}
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
