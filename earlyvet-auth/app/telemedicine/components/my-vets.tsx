"use client"

import { useState } from "react"
import { MessageSquare, Video, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function MyVets({ vets, onStartChat, onStartCall }) {
  const [expandedVet, setExpandedVet] = useState(null)

  if (!vets || vets.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">My Veterinarians</h2>
        <p className="text-muted-foreground mb-6">You don't have any connected veterinarians yet.</p>
        <Button variant="outline" onClick={() => (window.location.href = "#directory")}>
          Find Veterinarians
        </Button>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">My Veterinarians</h2>
        <p className="text-muted-foreground">Quick access to veterinarians you've connected with</p>
      </div>

      <div className="space-y-4">
        {vets.map((vet) => (
          <Card
            key={vet.id}
            className="mb-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setExpandedVet(expandedVet === vet.id ? null : vet.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={vet.image} alt={vet.name} />
                    <AvatarFallback>
                      {vet.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(vet.status)} ring-2 ring-white`}
                  ></span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Dr. {vet.name}</h3>
                      <p className="text-sm text-muted-foreground">{vet.specialty}</p>
                    </div>

                    <Badge
                      variant="outline"
                      className={`
                        ${
                          vet.status === "online"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : vet.status === "away"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      `}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {vet.status === "online" ? "Available Now" : vet.status === "away" ? "Away" : "Offline"}
                    </Badge>
                  </div>

                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {vet.experience}
                    </Badge>

                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      Connected
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>

            {expandedVet === vet.id && (
              <CardFooter className="px-4 py-3 border-t flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartChat(vet)
                  }}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Chat
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  disabled={vet.status === "offline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartCall(false)
                  }}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  className="text-xs"
                  disabled={vet.status === "offline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartCall(true)
                  }}
                >
                  <Video className="h-3 w-3 mr-1" />
                  Video
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

