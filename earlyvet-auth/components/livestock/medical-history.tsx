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
                {livestock.medicalHistory.map((record, index) => (
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
                {livestock.vaccinationHistory.map((record, index) => (
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
