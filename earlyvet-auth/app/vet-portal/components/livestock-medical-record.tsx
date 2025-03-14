"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Weight, Activity, FileText, ChevronDown, ChevronUp, Plus, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// Mock medical record data
const mockMedicalRecord = {
  id: "COW-123",
  name: "Bessie",
  species: "Bovine",
  breed: "Holstein",
  gender: "Female",
  birthDate: "2019-03-15",
  weight: "650 kg",
  status: "Active",
  location: "North Pasture",
  lastCheckup: "2023-04-28",
  medicalHistory: [
    {
      id: 1,
      date: "2023-04-28",
      condition: "Routine checkup",
      treatment: "Vaccinations updated",
      notes: "All vitals normal. Weight is good. Coat is healthy.",
      vet: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      date: "2023-02-10",
      condition: "Mild respiratory infection",
      treatment: "Antibiotics - 7 day course",
      notes:
        "Showing signs of coughing and nasal discharge. Temperature slightly elevated at 39.2°C. Prescribed Ceftiofur 2mg/kg once daily for 7 days.",
      vet: "Dr. Michael Chen",
    },
    {
      id: 3,
      date: "2022-11-05",
      condition: "Hoof trimming",
      treatment: "Routine maintenance",
      notes: "All four hooves trimmed. No signs of infection or abnormalities.",
      vet: "Dr. Emily Rodriguez",
    },
  ],
  vaccinations: [
    {
      id: 1,
      date: "2023-04-28",
      name: "BVD",
      nextDue: "2024-04-28",
      vet: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      date: "2023-04-28",
      name: "IBR",
      nextDue: "2024-04-28",
      vet: "Dr. Sarah Johnson",
    },
    {
      id: 3,
      date: "2022-10-15",
      name: "Leptospirosis",
      nextDue: "2023-10-15",
      vet: "Dr. Michael Chen",
    },
  ],
  notes:
    "Bessie is a high-producing dairy cow with excellent health record. She calved in January 2023 and is currently in lactation.",
}

export default function LivestockMedicalRecord({ livestock, onClose }) {
  const [medicalRecord, setMedicalRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openSection, setOpenSection] = useState("all")
  const [addingNote, setAddingNote] = useState(false)
  const [newNote, setNewNote] = useState({
    condition: "",
    treatment: "",
    notes: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch medical record
    const fetchMedicalRecord = async () => {
      try {
        // In a real app, you would fetch from your livestock service using the environment variables
        // const response = await fetch(`${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/${livestock.id}/medical`);
        // const data = await response.json();

        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // If a specific livestock is provided, use its ID to "fetch" data
        if (livestock) {
          // Simulate fetching specific livestock data
          // In a real app, you'd make an API call with the livestock ID
          setMedicalRecord({
            ...mockMedicalRecord,
            id: livestock.id,
            name: livestock.name,
            species: livestock.species,
          })
        } else {
          setMedicalRecord(mockMedicalRecord)
        }
      } catch (error) {
        console.error("Error fetching medical record:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalRecord()
  }, [livestock])

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "all" : section)
  }

  const handleAddNote = () => {
    setAddingNote(true)
  }

  const handleSaveNote = () => {
    // In a real app, you would send this to your API
    const newEntry = {
      id: medicalRecord.medicalHistory.length + 1,
      date: new Date().toISOString().split("T")[0],
      condition: newNote.condition,
      treatment: newNote.treatment,
      notes: newNote.notes,
      vet: "Dr. Sarah Johnson", // This would come from the logged-in user
    }

    setMedicalRecord({
      ...medicalRecord,
      medicalHistory: [newEntry, ...medicalRecord.medicalHistory],
    })

    setNewNote({
      condition: "",
      treatment: "",
      notes: "",
    })

    setAddingNote(false)

    toast({
      title: "Note Added",
      description: "Medical record has been updated successfully.",
    })
  }

  const handleCancelNote = () => {
    setAddingNote(false)
    setNewNote({
      condition: "",
      treatment: "",
      notes: "",
    })
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-3/4" />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Separator className="my-4" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  if (!medicalRecord) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Medical Record</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground">No medical record available.</p>
      </div>
    )
  }

  return (
    <div className="p-4 h-full overflow-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">{medicalRecord.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4">
          {medicalRecord.breed} {medicalRecord.species} • {medicalRecord.gender}
        </p>
        <Badge variant="outline">{medicalRecord.id}</Badge>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Birth Date</p>
              <p className="text-sm font-medium">{new Date(medicalRecord.birthDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="text-sm font-medium">{medicalRecord.weight}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium">{medicalRecord.status}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Last Checkup</p>
              <p className="text-sm font-medium">{new Date(medicalRecord.lastCheckup).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" className="flex items-center p-0 h-auto" onClick={() => toggleSection("medical")}>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span className="font-medium">Medical History</span>
          </div>
          {openSection === "medical" ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        <Button variant="outline" size="sm" className="text-xs" onClick={handleAddNote}>
          <Plus className="h-3 w-3 mr-1" />
          Add Note
        </Button>
      </div>

      <Collapsible open={openSection === "all" || openSection === "medical"}>
        <CollapsibleContent className="mt-2 space-y-3 max-h-[300px] overflow-auto pr-1 scrollbar-thin">
          {addingNote ? (
            <Card className="bg-muted/50">
              <CardContent className="p-3 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Condition</p>
                  <Input
                    placeholder="Enter condition or diagnosis"
                    value={newNote.condition}
                    onChange={(e) => setNewNote({ ...newNote, condition: e.target.value })}
                  />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Treatment</p>
                  <Input
                    placeholder="Enter prescribed treatment"
                    value={newNote.treatment}
                    onChange={(e) => setNewNote({ ...newNote, treatment: e.target.value })}
                  />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <Textarea
                    placeholder="Enter additional notes"
                    value={newNote.notes}
                    onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" className="text-xs" onClick={handleCancelNote}>
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" className="text-xs" onClick={handleSaveNote}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            medicalRecord.medicalHistory.map((record, index) => (
              <Card key={record.id} className="bg-muted/50">
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
                  <p className="text-sm font-medium mt-1">{record.condition}</p>
                  <p className="text-xs mt-1">Treatment: {record.treatment}</p>
                  <p className="text-xs mt-1">Notes: {record.notes}</p>
                  <p className="text-xs text-muted-foreground mt-1">Vet: {record.vet}</p>
                </CardContent>
              </Card>
            ))
          )}
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      <Collapsible open={openSection === "all" || openSection === "vaccinations"}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-0 h-auto"
            onClick={() => toggleSection("vaccinations")}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium">Vaccinations</span>
            </div>
            {openSection === "vaccinations" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-3 max-h-[200px] overflow-auto pr-1 scrollbar-thin">
            {medicalRecord.vaccinations.map((vaccination) => (
              <Card key={vaccination.id} className="bg-muted/50">
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{vaccination.name}</p>
                    <Badge variant="outline" className="text-xs">
                      Next due: {new Date(vaccination.nextDue).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Administered: {new Date(vaccination.date).toLocaleDateString()} by {vaccination.vet}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      <Collapsible open={openSection === "all" || openSection === "notes"}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-0 h-auto"
            onClick={() => toggleSection("notes")}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium">General Notes</span>
            </div>
            {openSection === "notes" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Textarea
            value={medicalRecord.notes}
            onChange={(e) => setMedicalRecord({ ...medicalRecord, notes: e.target.value })}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Save className="h-3 w-3 mr-1" />
              Update Notes
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

