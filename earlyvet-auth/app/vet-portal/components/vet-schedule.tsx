"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, MessageSquare, Video, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock schedule data
const mockSchedule = {
  "2023-05-15": [
    {
      id: 1,
      time: "10:30 AM",
      duration: "30 min",
      type: "video",
      farmer: {
        id: "FARMER-001",
        name: "John Doe",
        image: "/placeholder.svg?height=40&width=40",
        farm: "Green Acres Farm",
      },
      livestock: {
        id: "COW-123",
        name: "Bessie",
        species: "Bovine",
      },
    },
    {
      id: 2,
      time: "1:15 PM",
      duration: "30 min",
      type: "chat",
      farmer: {
        id: "FARMER-002",
        name: "Alice Smith",
        image: "/placeholder.svg?height=40&width=40",
        farm: "Smith Family Farm",
      },
      livestock: {
        id: "PIG-789",
        name: "Wilbur",
        species: "Porcine",
      },
    },
    {
      id: 3,
      time: "3:45 PM",
      duration: "45 min",
      type: "video",
      farmer: {
        id: "FARMER-003",
        name: "Robert Johnson",
        image: "/placeholder.svg?height=40&width=40",
        farm: "Johnson Dairy",
      },
      livestock: {
        id: "COW-456",
        name: "Daisy",
        species: "Bovine",
      },
    },
  ],
  "2023-05-16": [
    {
      id: 4,
      time: "9:00 AM",
      duration: "30 min",
      type: "video",
      farmer: {
        id: "FARMER-004",
        name: "Emily Davis",
        image: "/placeholder.svg?height=40&width=40",
        farm: "Davis Ranch",
      },
      livestock: {
        id: "SHEEP-234",
        name: "Woolly",
        species: "Ovine",
      },
    },
    {
      id: 5,
      time: "2:30 PM",
      duration: "30 min",
      type: "chat",
      farmer: {
        id: "FARMER-005",
        name: "Michael Brown",
        image: "/placeholder.svg?height=40&width=40",
        farm: "Brown's Goat Farm",
      },
      livestock: {
        id: "GOAT-567",
        name: "Billy",
        species: "Caprine",
      },
    },
  ],
  "2023-05-17": [
    {
      id: 6,
      time: "11:00 AM",
      duration: "45 min",
      type: "video",
      farmer: {
        id: "FARMER-006",
        name: "Sarah Wilson",
        image: "/placeholder.svg?height=40&width=40",
        farm: "Wilson Livestock",
      },
      livestock: {
        id: "COW-789",
        name: "Moo",
        species: "Bovine",
      },
    },
  ],
}

export default function VetSchedule({ onStartChat, onStartCall }) {
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch schedule
    const fetchSchedule = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSchedule(mockSchedule)
      setLoading(false)
    }

    fetchSchedule()
  }, [])

  const formattedDate = format(selectedDate, "yyyy-MM-dd")
  const appointments = schedule[formattedDate] || []

  const handlePreviousDay = () => {
    const prevDay = new Date(selectedDate)
    prevDay.setDate(prevDay.getDate() - 1)
    setSelectedDate(prevDay)
  }

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate)
    nextDay.setDate(nextDay.getDate() + 1)
    setSelectedDate(nextDay)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setCalendarOpen(false)
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule</h2>
        <p className="text-muted-foreground">Manage your appointments and consultations</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePreviousDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, "MMMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline">Set Availability</Button>
      </div>

      {loading ? (
        <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-auto pr-1">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4">
              <CardContent className="p-0">
                <div className="p-4 flex items-start space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          {appointments.length > 0 ? (
            <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-auto pr-1 scrollbar-thin">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={appointment.farmer.image} alt={appointment.farmer.name} />
                        <AvatarFallback>
                          {appointment.farmer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{appointment.farmer.name}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.farmer.farm}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{appointment.time}</span>
                            </Badge>

                            <Badge variant="outline" className="flex items-center space-x-1">
                              {appointment.type === "video" ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <MessageSquare className="h-3 w-3" />
                              )}
                              <span className="capitalize">{appointment.type}</span>
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm">
                            <span className="font-medium">{appointment.livestock.name}</span>
                            <span className="text-muted-foreground"> (ID: {appointment.livestock.id})</span>
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {appointment.livestock.species} • {appointment.duration} consultation
                          </p>
                        </div>

                        <div className="mt-3 flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => onStartChat(appointment.farmer, appointment.livestock)}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Chat
                          </Button>

                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs"
                            onClick={() =>
                              onStartCall(appointment.farmer, appointment.livestock, appointment.type === "video")
                            }
                          >
                            <Video className="h-3 w-3 mr-1" />
                            {appointment.type === "video" ? "Video Call" : "Call"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Appointments</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any appointments scheduled for {format(selectedDate, "MMMM d, yyyy")}.
              </p>
              <Button variant="outline">Add Appointment</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

