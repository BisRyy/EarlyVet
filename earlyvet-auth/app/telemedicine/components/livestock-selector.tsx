"use client";

import { useState, useEffect } from "react";
import { Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Mock livestock data
const mockLivestock = [
  {
    id: "COW-123",
    name: "Bessie",
    species: "Bovine",
    breed: "Holstein",
    gender: "Female",
    age: "4 years",
    image: "/placeholder.svg?height=80&width=80",
    status: "Healthy",
  },
  {
    id: "COW-456",
    name: "Daisy",
    species: "Bovine",
    breed: "Jersey",
    gender: "Female",
    age: "3 years",
    image: "/placeholder.svg?height=80&width=80",
    status: "Pregnant",
  },
  {
    id: "PIG-789",
    name: "Wilbur",
    species: "Porcine",
    breed: "Yorkshire",
    gender: "Male",
    age: "1 year",
    image: "/placeholder.svg?height=80&width=80",
    status: "Healthy",
  },
  {
    id: "SHEEP-234",
    name: "Woolly",
    species: "Ovine",
    breed: "Merino",
    gender: "Female",
    age: "2 years",
    image: "/placeholder.svg?height=80&width=80",
    status: "Healthy",
  },
  {
    id: "GOAT-567",
    name: "Billy",
    species: "Caprine",
    breed: "Boer",
    gender: "Male",
    age: "3 years",
    image: "/placeholder.svg?height=80&width=80",
    status: "Injured",
  },
];

export default function LivestockSelector({
  onLivestockSelect,
  selectedLivestock,
  selectedVet,
  onRequestAppointment,
}) {
  const [livestock, setLivestock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API call to fetch livestock
    const fetchLivestock = async () => {
      const response = await fetch("http://localhost:5001/api/livestock");
      const data = await response.json();
      const livestock = data.map((animal) => ({
        id: animal.id,
        name: animal.name,
        species: ["bovine", "porcine", "ovine", "caprine"][
          Math.floor(Math.random() * 4)
        ],
        breed: animal.breed,
        gender: animal.gender,
        age: `${Math.floor(Math.random() * 5) + 1} years`,
        image: "/placeholder.svg?height=80&width=80",
        status: ["healthy", "pregnant", "injured", "sick"][
          Math.floor(Math.random() * 4)
        ],
      }));

      setLivestock(livestock);
      setLoading(false);
    };

    fetchLivestock();
  }, []);

  const filteredLivestock = livestock.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "pregnant":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "injured":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "sick":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-bold">Select Livestock</h2>
        </div>
        {selectedVet && (
          <p className="text-muted-foreground">
            Requesting appointment with Dr. {selectedVet.name}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search livestock..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4">
              <CardContent className="p-0">
                <div className="p-4 flex items-start space-x-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLivestock.map((animal) => (
            <Card
              key={animal.id}
              className={`mb-4 cursor-pointer transition-all ${
                selectedLivestock?.id === animal.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onLivestockSelect(animal)}
            >
              <CardContent className="p-0">
                <div className="p-4 flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border">
                      <AvatarImage src={animal.image} alt={animal.name} />
                      <AvatarFallback>
                        {animal.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{animal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {animal.species} • {animal.breed}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getStatusColor(animal.status)}
                      >
                        {animal.status}
                      </Badge>
                    </div>

                    <div className="mt-2 flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {animal.gender}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {animal.age}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {animal.id}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>

              {selectedLivestock?.id === animal.id && (
                <CardFooter className="px-4 py-3 border-t flex justify-end">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestAppointment();
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Request Appointment
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}

          {filteredLivestock.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No livestock found matching your search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
