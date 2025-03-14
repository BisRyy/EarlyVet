"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for veterinarians
const mockVets = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Large Animal Medicine",
    experience: "8 years",
    rating: 4.8,
    availability: "Available Now",
    image: "/placeholder.svg?height=80&width=80",
    status: "online",
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Livestock Nutrition",
    experience: "12 years",
    rating: 4.9,
    availability: "Available in 30 min",
    image: "/placeholder.svg?height=80&width=80",
    status: "away",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    specialty: "Bovine Health",
    experience: "5 years",
    rating: 4.6,
    availability: "Available Now",
    image: "/placeholder.svg?height=80&width=80",
    status: "online",
  },
  {
    id: 4,
    name: "David Kim",
    specialty: "Poultry Medicine",
    experience: "10 years",
    rating: 4.7,
    availability: "Available Tomorrow",
    image: "/placeholder.svg?height=80&width=80",
    status: "offline",
  },
  {
    id: 5,
    name: "Lisa Patel",
    specialty: "Livestock Surgery",
    experience: "15 years",
    rating: 5.0,
    availability: "Available Now",
    image: "/placeholder.svg?height=80&width=80",
    status: "online",
  },
];

export default function VetDirectory({ onVetSelect, selectedVet }) {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVets = async () => {
      const response = await fetch("http://localhost:5001/api/users/vets");
      const data = await response.json();
      const vets = data.map((vet) => ({
        id: vet.id,
        name: vet.name,
        specialty: [
          "Large Animal Medicine",
          "Livestock Nutrition",
          "Bovine Health",
          "Poultry Medicine",
          "Livestock Surgery",
        ][Math.floor(Math.random() * 5)],
        experience: `${Math.floor(Math.random() * 20)} years`,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        availability: [
          "Available Now",
          "Available in 30 min",
          "Available Tomorrow",
        ][Math.floor(Math.random() * 3)],
        image: "/placeholder.svg?height=80&width=80",
        status: ["online", "away", "offline"][Math.floor(Math.random() * 3)],
      }));

      setVets(vets);
      setLoading(false);
    };

    fetchVets();
  }, []);

  const filteredVets = vets.filter(
    (vet) =>
      vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Find a Veterinarian</h2>
        <p className="text-muted-foreground">
          Select a veterinarian to request an appointment
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
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
          {filteredVets.map((vet) => (
            <Card
              key={vet.id}
              className={`mb-4 cursor-pointer transition-all ${
                selectedVet?.id === vet.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onVetSelect(vet)}
            >
              <CardContent className="p-0">
                <div className="p-4 flex items-start space-x-4">
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
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(
                        vet.status
                      )} ring-2 ring-white`}
                    ></span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Dr. {vet.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {vet.specialty}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {vet.rating}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {vet.experience}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          vet?.availability?.includes("Now")
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {vet.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>

              {selectedVet?.id === vet.id && (
                <CardFooter className="px-4 py-3 border-t flex justify-end space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVetSelect(vet);
                    }}
                  >
                    Select This Veterinarian
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}

          {filteredVets.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No veterinarians found matching your search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
