"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Video, Calendar, Users } from "lucide-react"

export default function WelcomeScreen({ onFindVets }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">EarlyVet Telemedicine</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with specialized veterinarians for your livestock health needs. Get expert advice, diagnoses, and
          treatment plans through chat or video calls.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat Consultations
            </CardTitle>
            <CardDescription>Text-based consultations with veterinarians</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Describe your livestock's symptoms, share photos, and receive expert advice through our secure messaging
              platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Video Calls
            </CardTitle>
            <CardDescription>Face-to-face consultations with veterinarians</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Show your livestock's condition in real-time through high-quality video calls for more accurate diagnoses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Appointment Scheduling
            </CardTitle>
            <CardDescription>Book appointments with veterinarians</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Schedule consultations at your convenience and receive reminders before your appointment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Specialized Veterinarians
            </CardTitle>
            <CardDescription>Access to a network of livestock specialists</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Connect with veterinarians who specialize in different types of livestock and specific health conditions.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button size="lg" onClick={onFindVets}>
          Find Veterinarians
        </Button>
      </div>
    </div>
  )
}

