"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, MessageSquare, Video, Clock, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

// Mock consultation history data
const mockConsultations = [
  {
    id: "chat-1",
    type: "chat",
    vetName: "Sarah Johnson",
    vetImage: "/placeholder.svg?height=40&width=40",
    date: "2023-05-15T14:30:00",
    duration: "45 min",
    livestockId: "COW-123",
    livestockName: "Bessie",
    summary: "Discussed lameness in front right leg, prescribed antibiotics and rest.",
    status: "completed",
  },
  {
    id: "call-1",
    type: "video",
    vetName: "Michael Chen",
    vetImage: "/placeholder.svg?height=40&width=40",
    date: "2023-05-10T11:15:00",
    duration: "30 min",
    livestockId: "COW-456",
    livestockName: "Daisy",
    summary: "Examined calf with respiratory issues, recommended treatment plan.",
    status: "completed",
  },
  {
    id: "chat-2",
    type: "chat",
    vetName: "Emily Rodriguez",
    vetImage: "/placeholder.svg?height=40&width=40",
    date: "2023-05-05T09:00:00",
    duration: "20 min",
    livestockId: "PIG-789",
    livestockName: "Wilbur",
    summary: "Follow-up on previous treatment, recovery progressing well.",
    status: "completed",
  },
  {
    id: "call-2",
    type: "audio",
    vetName: "David Kim",
    vetImage: "/placeholder.svg?height=40&width=40",
    date: "2023-04-28T16:45:00",
    duration: "15 min",
    livestockId: "SHEEP-234",
    livestockName: "Woolly",
    summary: "Quick consultation about vaccination schedule for flock.",
    status: "completed",
  },
]

export default function ConsultationHistory({ onViewChat }) {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch consultation history
    const fetchConsultations = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setConsultations(mockConsultations)
      setLoading(false)
    }

    fetchConsultations()
  }, [])

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.vetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.livestockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.summary.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "chat") return matchesSearch && consultation.type === "chat"
    if (activeTab === "calls") return matchesSearch && (consultation.type === "video" || consultation.type === "audio")

    return matchesSearch
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getConsultationTypeIcon = (type) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Clock className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Consultation History</h2>
        <p className="text-muted-foreground">View your past consultations with veterinarians</p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search consultations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="chat">Chats</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <Card
                key={consultation.id}
                className="mb-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => {
                  if (consultation.type === "chat") {
                    onViewChat(consultation.id)
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={consultation.vetImage} alt={consultation.vetName} />
                      <AvatarFallback>
                        {consultation.vetName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Dr. {consultation.vetName}</h3>
                          <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(consultation.date)}</span>
                            <span>•</span>
                            <span>{formatTime(consultation.date)}</span>
                          </div>
                        </div>

                        <Badge variant="outline" className="flex items-center space-x-1">
                          {getConsultationTypeIcon(consultation.type)}
                          <span className="capitalize">{consultation.type}</span>
                        </Badge>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">{consultation.livestockName}</span>
                          <span className="text-muted-foreground"> (ID: {consultation.livestockId})</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{consultation.summary}</p>
                      </div>

                      {consultation.type === "chat" && (
                        <div className="mt-3 flex justify-end">
                          <Button variant="ghost" size="sm" className="text-xs">
                            View Chat <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No consultations found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

