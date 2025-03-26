"use client";

import { LivestockDetails } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MedicalHistoryProps {
  livestock: LivestockDetails;
}

const vaccinationHistory = [
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
];
const medicalHistory = [
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
];

export function MedicalHistory({ livestock }: MedicalHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="vaccinations">Vaccination History</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Treatment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {livestock.medicalHistory
                  ? livestock.medicalHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.condition}</TableCell>
                        <TableCell>{record.treatment}</TableCell>
                      </TableRow>
                    ))
                  : medicalHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.condition}</TableCell>
                        <TableCell>{record.treatment}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="vaccinations">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vaccine</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {livestock.vaccinationHistory
                  ? livestock.vaccinationHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.name}</TableCell>
                      </TableRow>
                    ))
                  : vaccinationHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.name}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
