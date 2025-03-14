"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Calendar, Clock, FileText, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock appointment request data
const mockAppointmentRequests = [
  {
    id: 1,
    farmerName: "John Doe",
    farmerImage: "/placeholder.svg?height=40&width=40",
    farmerId: "FARMER-001",
    livestockName: "Bessie",
    livestockId: "COW-123",
    livestockSpecies: "Bovine",
    requestDate: "2023-05-15T14:30:00",
    preferredDate: "2023-05-18",
    preferredTime: "Morning",
    reason: "Cow showing signs of lameness in front right leg, decreased appetite, and slight fever.",
    status: "pending",
    urgent: false,
  },
  {
    id: 2,
    farmerName: "Alice Smith",
    farmerImage: "/placeholder.svg?height=40&width=40",
    farmerId: "FARMER-002",
    livestockName: "Wilbur",
    livestockId: "PIG-789",
    livestockSpecies: "Porcine",
    requestDate: "2023-05-14T09:15:00",
    preferredDate: "2023-05-16",
    preferredTime: "Afternoon",
    reason: "Pig has been coughing and seems lethargic. Concerned about respiratory infection.",
    status: "pending",
    urgent: true,
  },
  {
    id: 3,
    farmerName: "Robert Johnson",
    farmerImage: "/placeholder.svg?height=40&width=40",
    farmerId: "FARMER-003",
    livestockName: "Daisy",
    livestockId: "COW-456",
    livestockSpecies: "Bovine",
    requestDate: "2023-05-13T16:45:00",
    preferredDate: "2023-05-17",
    preferredTime: "Evening",
    reason: "Follow-up consultation for previously treated mastitis. Want to ensure recovery is progressing well.",
    status: "pending",
    urgent: false,
  },
  {
    id: 4,
    farmerName: "Emily Davis",
    farmerImage: "/placeholder.svg?height=40&width=40",
    farmerId: "FARMER-004",
    livestockName: "Woolly",
    livestockId: "SHEEP-234",
    livestockSpecies: "Ovine",
    requestDate: "2023-05-12T11:30:00",
    preferredDate: "2023-05-19",
    preferredTime: "Morning",
    reason: "Sheep showing signs of possible parasitic infection. Not eating well and wool appears dull.",
    status: "pending",
    urgent: false,
  },
  {
    id: 5,
    farmerName: "Michael Brown",
    farmerImage: "/placeholder.svg?height=40&width=40",
    farmerId: "FARMER-005",
    livestockName: "Billy",
    livestockId: "GOAT-567",
    livestockSpecies: "Caprine",
    requestDate: "2023-05-11T13:20:00",
    preferredDate: "2023-05-15",
    preferredTime: "Afternoon",
    reason: "Goat injured leg, appears to be a cut that might need stitches or at least proper cleaning and treatment.",
    status: "pending",
    urgent: true,
  },
]

export default function AppointmentRequests({ onAccept, onDecline, onViewMedicalRecord }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [responseNote, setResponseNote] = useState("")
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [responseType, setResponseType] = useState(null) // 'accept' or 'decline'

  useEffect(() => {
    // Simulate API call to fetch appointment requests
    const fetchRequests = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRequests(mockAppointmentRequests)
      setLoading(false)
    }

    fetchRequests()
  }, [])

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.livestockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.livestockId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "urgent") return matchesSearch && request.urgent
    if (activeTab === "regular") return matchesSearch && !request.urgent

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

  const handleAcceptClick = (request) => {
    setSelectedRequest(request)
    setResponseType("accept")
    setResponseNote("")
    setShowResponseDialog(true)
  }

  const handleDeclineClick = (request) => {
    setSelectedRequest(request)
    setResponseType("decline")
    setResponseNote("")
    setShowResponseDialog(true)
  }

  const handleResponseSubmit = () => {
    if (responseType === "accept") {
      onAccept({ ...selectedRequest, note: responseNote })
    } else {
      onDecline({ ...selectedRequest, note: responseNote })
    }

    // Update the local state to remove the request
    setRequests(requests.filter((r) => r.id !== selectedRequest.id))
    setShowResponseDialog(false)
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Appointment Requests</h2>
        <p className="text-muted-foreground">Review and respond to appointment requests from farmers</p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="regular">Regular</TabsTrigger>
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
        <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-auto pr-1 scrollbar-thin">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <Card key={request.id} className={`mb-4 ${request.urgent ? "border-red-300 bg-red-50" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={request.farmerImage} alt={request.farmerName} />
                      <AvatarFallback>
                        {request.farmerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.farmerName}</h3>
                          <p className="text-sm text-muted-foreground">Farmer ID: {request.farmerId}</p>
                        </div>

                        <div className="flex items-center">
                          {request.urgent && (
                            <Badge variant="destructive" className="mr-2">
                              Urgent
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {request.livestockSpecies}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">{request.livestockName}</span>
                          <span className="text-muted-foreground"> (ID: {request.livestockId})</span>
                        </p>
                        <p className="text-sm mt-1">{request.reason}</p>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Requested: {formatDate(request.requestDate)}</span>
                        </div>

                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            Preferred: {request.preferredDate}, {request.preferredTime}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() =>
                            onViewMedicalRecord({
                              id: request.livestockId,
                              name: request.livestockName,
                              species: request.livestockSpecies,
                            })
                          }
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          View Medical Record
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeclineClick(request)}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Decline
                        </Button>

                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleAcceptClick(request)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No appointment requests found matching your search.</p>
            </div>
          )}
        </div>
      )}

      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {responseType === "accept" ? "Accept Appointment Request" : "Decline Appointment Request"}
            </DialogTitle>
            <DialogDescription>
              {responseType === "accept"
                ? "Add any notes or instructions for the farmer."
                : "Please provide a reason for declining this appointment request."}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="mb-4">
              <p className="text-sm">
                <span className="font-medium">Farmer:</span> {selectedRequest.farmerName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Livestock:</span> {selectedRequest.livestockName} (
                {selectedRequest.livestockId})
              </p>
              <p className="text-sm">
                <span className="font-medium">Preferred Date:</span> {selectedRequest.preferredDate},{" "}
                {selectedRequest.preferredTime}
              </p>
            </div>
          )}

          <Textarea
            placeholder={
              responseType === "accept"
                ? "Add any special instructions or notes for the farmer..."
                : "Provide a reason for declining..."
            }
            value={responseNote}
            onChange={(e) => setResponseNote(e.target.value)}
            rows={4}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
              Cancel
            </Button>
            <Button variant={responseType === "accept" ? "default" : "destructive"} onClick={handleResponseSubmit}>
              {responseType === "accept" ? "Accept Request" : "Decline Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

