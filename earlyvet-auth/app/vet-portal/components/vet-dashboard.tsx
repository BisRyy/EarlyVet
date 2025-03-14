"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, Clock, AlertCircle, CheckCircle, MessageSquare, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function VetDashboard({ onViewAppointments, onViewPatients, onViewSchedule }) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState([])

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStats({
        pendingRequests: 5,
        todayAppointments: 3,
        activePatients: 28,
        completedConsultations: 124,
      })

      setUpcomingAppointments([
        {
          id: 1,
          farmerName: "John Doe",
          farmerImage: "/placeholder.svg?height=40&width=40",
          livestockName: "Bessie",
          livestockId: "COW-123",
          time: "10:30 AM",
          type: "video",
        },
        {
          id: 2,
          farmerName: "Alice Smith",
          farmerImage: "/placeholder.svg?height=40&width=40",
          livestockName: "Wilbur",
          livestockId: "PIG-789",
          time: "1:15 PM",
          type: "chat",
        },
        {
          id: 3,
          farmerName: "Robert Johnson",
          farmerImage: "/placeholder.svg?height=40&width=40",
          livestockName: "Daisy",
          livestockId: "COW-456",
          time: "3:45 PM",
          type: "video",
        },
      ])

      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 mb-4" />
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Skeleton className="h-8 w-64 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, Dr. Sarah</h1>
        <p className="text-muted-foreground">
          {getCurrentDate()} • {getCurrentTime()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <AlertCircle className="h-8 w-8 text-blue-500 mb-4" />
            <p className="text-2xl font-bold text-blue-700">{stats.pendingRequests}</p>
            <p className="text-blue-600">Pending Requests</p>
          </CardContent>
          <CardFooter className="p-0">
            <Button variant="link" className="w-full text-blue-700 hover:text-blue-900" onClick={onViewAppointments}>
              View Requests
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <Calendar className="h-8 w-8 text-green-500 mb-4" />
            <p className="text-2xl font-bold text-green-700">{stats.todayAppointments}</p>
            <p className="text-green-600">Today's Appointments</p>
          </CardContent>
          <CardFooter className="p-0">
            <Button variant="link" className="w-full text-green-700 hover:text-green-900" onClick={onViewSchedule}>
              View Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <Users className="h-8 w-8 text-purple-500 mb-4" />
            <p className="text-2xl font-bold text-purple-700">{stats.activePatients}</p>
            <p className="text-purple-600">Active Patients</p>
          </CardContent>
          <CardFooter className="p-0">
            <Button variant="link" className="w-full text-purple-700 hover:text-purple-900" onClick={onViewPatients}>
              View Patients
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <CheckCircle className="h-8 w-8 text-amber-500 mb-4" />
            <p className="text-2xl font-bold text-amber-700">{stats.completedConsultations}</p>
            <p className="text-amber-600">Completed Consultations</p>
          </CardContent>
          <CardFooter className="p-0">
            <Button variant="link" className="w-full text-amber-700 hover:text-amber-900">
              View History
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-auto pr-1 scrollbar-thin">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start space-x-4 p-3 rounded-lg border">
                  <Avatar>
                    <AvatarImage src={appointment.farmerImage} alt={appointment.farmerName} />
                    <AvatarFallback>
                      {appointment.farmerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{appointment.farmerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.livestockName} ({appointment.livestockId})
                        </p>
                      </div>
                      <div className="flex items-center">
                        {appointment.type === "video" ? (
                          <Video className="h-4 w-4 mr-1 text-blue-500" />
                        ) : (
                          <MessageSquare className="h-4 w-4 mr-1 text-green-500" />
                        )}
                        <span className="text-sm font-medium">{appointment.time}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Reschedule
                      </Button>
                      <Button variant="default" size="sm" className="text-xs">
                        Start {appointment.type === "video" ? "Call" : "Chat"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={onViewSchedule}>
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Your activity for the past week</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-auto pr-1 scrollbar-thin">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Consultations Completed</span>
                  <span className="text-sm font-medium">12/15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Response Rate</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Patient Satisfaction</span>
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Availability Hours</span>
                  <span className="text-sm font-medium">32/40</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">18.5</p>
                    <p className="text-xs text-muted-foreground">Avg. Response Time (min)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">97%</p>
                    <p className="text-xs text-muted-foreground">Issue Resolution Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

