"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MessageSquare, Video, Phone, FileText, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock patient data
const mockPatients = [
  {
    id: "COW-123",
    name: "Bessie",
    species: "Bovine",
    breed: "Holstein",
    gender: "Female",
    age: "4 years",
    status: "Healthy",
    lastCheckup: "2023-04-28",
    farmer: {
      id: "FARMER-001",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      farm: "Green Acres Farm",
    },
    recentIssue: null,
  },
  {
    id: "PIG-789",
    name: "Wilbur",
    species: "Porcine",
    breed: "Yorkshire",
    gender: "Male",
    age: "1 year",
    status: "Sick",
    lastCheckup: "2023-05-10",
    farmer: {
      id: "FARMER-002",
      name: "Alice Smith",
      image: "/placeholder.svg?height=40&width=40",
      farm: "Smith Family Farm",
    },
    recentIssue: "Respiratory infection, prescribed antibiotics on May 10",
  },
  {
    id: "COW-456",
    name: "Daisy",
    species: "Bovine",
    breed: "Jersey",
    gender: "Female",
    age: "3 years",
    status: "Recovering",
    lastCheckup: "2023-05-05",
    farmer: {
      id: "FARMER-003",
      name: "Robert Johnson",
      image: "/placeholder.svg?height=40&width=40",
      farm: "Johnson Dairy",
    },
    recentIssue: "Mastitis, follow-up scheduled for May 20",
  },
  {
    id: "SHEEP-234",
    name: "Woolly",
    species: "Ovine",
    breed: "Merino",
    gender: "Female",
    age: "2 years",
    status: "Healthy",
    lastCheckup: "2023-03-15",
    farmer: {
      id: "FARMER-004",
      name: "Emily Davis",
      image: "/placeholder.svg?height=40&width=40",
      farm: "Davis Ranch",
    },
    recentIssue: null,
  },
  {
    id: "GOAT-567",
    name: "Billy",
    species: "Caprine",
    breed: "Boer",
    gender: "Male",
    age: "3 years",
    status: "Injured",
    lastCheckup: "2023-05-12",
    farmer: {
      id: "FARMER-005",
      name: "Michael Brown",
      image: "/placeholder.svg?height=40&width=40",
      farm: "Brown's Goat Farm",
    },
    recentIssue: "Leg injury, bandaged and prescribed pain medication",
  },
]

export default function PatientList({ onStartChat, onStartCall, onViewMedicalRecord }) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedPatient, setExpandedPatient] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch patients
    const fetchPatients = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPatients(mockPatients)
      setLoading(false)
    }

    fetchPatients()
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.farmer.farm.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "bovine") return matchesSearch && patient.species === "Bovine"
    if (activeTab === "porcine") return matchesSearch && patient.species === "Porcine"
    if (activeTab === "ovine") return matchesSearch && patient.species === "Ovine"
    if (activeTab === "caprine") return matchesSearch && patient.species === "Caprine"
    if (activeTab === "attention")
      return (
        matchesSearch && (patient.status === "Sick" || patient.status === "Injured" || patient.status === "Recovering")
      )

    return matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "sick":
        return "bg-red-100 text-red-800 border-red-200"
      case "injured":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "recovering":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pregnant":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const toggleExpanded = (id) => {
    setExpandedPatient(expandedPatient === id ? null : id)
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Patient List</h2>
        <p className="text-muted-foreground">Manage and view your livestock patients</p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bovine">Bovine</TabsTrigger>
          <TabsTrigger value="porcine">Porcine</TabsTrigger>
          <TabsTrigger value="ovine">Ovine</TabsTrigger>
          <TabsTrigger value="caprine">Caprine</TabsTrigger>
          <TabsTrigger value="attention">Needs Attention</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-auto pr-1">
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
        <div className="max-h-[calc(100vh-240px)] overflow-auto pr-1 scrollbar-thin">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <Collapsible
                key={patient.id}
                open={expandedPatient === patient.id}
                onOpenChange={() => toggleExpanded(patient.id)}
              >
                <Card className="mb-4">
                  <CardContent className="p-0">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="p-4 flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{patient.name}</h3>
                                <Badge className="ml-2" variant="outline">
                                  {patient.id}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {patient.breed} {patient.species} • {patient.gender} • {patient.age}
                              </p>
                            </div>

                            <div className="flex items-center">
                              <Badge variant="outline" className={getStatusColor(patient.status)}>
                                {patient.status}
                              </Badge>
                              {expandedPatient === patient.id ? (
                                <ChevronUp className="h-4 w-4 ml-2" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-2" />
                              )}
                            </div>
                          </div>

                          <div className="mt-2 flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={patient.farmer.image} alt={patient.farmer.name} />
                                <AvatarFallback>
                                  {patient.farmer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{patient.farmer.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{patient.farmer.farm}</span>
                          </div>

                          {patient.recentIssue && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium text-amber-600">Recent Issue:</span> {patient.recentIssue}
                            </p>
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-2 border-t">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => onViewMedicalRecord(patient)}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Medical Record
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => onStartChat(patient.farmer, patient)}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Chat
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => onStartCall(patient.farmer, patient, false)}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>

                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs"
                            onClick={() => onStartCall(patient.farmer, patient, true)}
                          >
                            <Video className="h-3 w-3 mr-1" />
                            Video
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No patients found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

