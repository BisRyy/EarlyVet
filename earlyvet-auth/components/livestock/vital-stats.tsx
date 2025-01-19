"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorReading } from "@/lib/types";
import { Heart, ThermometerSun, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface VitalStatsProps {
  readings: {
    temperature: SensorReading[];
    heartRate: SensorReading[];
    activity: SensorReading[];
  };
}

export function VitalStats({ readings }: VitalStatsProps) {
  const getLatestReading = (data: SensorReading[]) => {
    return data.length > 0 ? data[data.length - 1].value : 0;
  };

  const stats = [
    {
      title: "Temperature",
      value: getLatestReading(readings.temperature),
      unit: "°C",
      icon: ThermometerSun,
      color: "text-orange-500",
    },
    {
      title: "Heart Rate",
      value: getLatestReading(readings.heartRate),
      unit: "bpm",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Activity Level",
      value: getLatestReading(readings.activity),
      unit: "steps/hr",
      icon: Activity,
      color: "text-blue-500",
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
              {stat.value.toFixed(1)} {stat.unit}
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
