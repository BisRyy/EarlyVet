"use client";

import { DiseasePrediction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PredictionCardProps {
  prediction: DiseasePrediction | null;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  if (!prediction)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Disease Prediction
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            No prediction available.
          </div>
        </CardContent>
      </Card>
    );

  const severity =
    prediction.probability > 0.7
      ? "high"
      : prediction.probability > 0.4
      ? "medium"
      : "low";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Disease Prediction
          <span className="text-sm text-muted-foreground">
            {new Date(prediction.timestamp).toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={severity === "high" ? "destructive" : "default"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Predicted Disease: {prediction.disease}</AlertTitle>
          <AlertDescription>
            Probability: {(prediction.probability * 100).toFixed(1)}%
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="font-medium">Risk Level:</div>
          <Progress
            value={prediction.probability * 100}
            className={`h-2 ${
              severity === "high"
                ? "bg-red-100"
                : severity === "medium"
                ? "bg-yellow-100"
                : "bg-green-100"
            }`}
          />
        </div>

        <div className="space-y-2">
          <div className="font-medium">Symptoms:</div>
          <ul className="list-disc pl-4 space-y-1">
            {prediction.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="font-medium">Recommended Actions:</div>
          <ul className="space-y-2">
            {prediction.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
