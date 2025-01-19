"use client";

import { Sensor } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Battery, Activity, ThermometerSun, Heart } from "lucide-react";

interface SensorTableProps {
  sensors: Sensor[];
  onViewReadings: (sensor: Sensor) => void;
}

export function SensorTable({ sensors, onViewReadings }: SensorTableProps) {
  const getSensorIcon = (type: Sensor["type"]) => {
    switch (type) {
      case "temperature":
        return <ThermometerSun className="h-4 w-4" />;
      case "heart-rate":
        return <Heart className="h-4 w-4" />;
      case "activity":
        return <Activity className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Sensor["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Reading</TableHead>
          <TableHead>Battery</TableHead>
          <TableHead>Collar ID</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensors.map((sensor) => (
          <TableRow key={sensor._id}>
            <TableCell>{sensor.name}</TableCell>
            <TableCell className="flex items-center gap-2">
              {getSensorIcon(sensor.type)}
              {sensor.type}
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={getStatusColor(sensor.status)}
              >
                {sensor.status}
              </Badge>
            </TableCell>
            <TableCell>
              {sensor.lastReading}
              <span className="text-gray-500 ml-2">
                ({new Date(sensor.lastReadingTime).toLocaleString()})
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                {sensor.batteryLevel}%
              </div>
            </TableCell>
            <TableCell>{sensor.collarId}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewReadings(sensor)}
              >
                View Readings
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
