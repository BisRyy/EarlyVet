"use client";

import { useState } from "react";
import { Livestock } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash, View } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface LivestockTableProps {
  livestock: Livestock[];
  onEdit: (livestock: Livestock) => void;
  onDelete: (id: string) => void;
}

export function LivestockTable({
  livestock,
  onEdit,
  onDelete,
}: LivestockTableProps) {
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "sick":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* <TableHead>ID</TableHead> */}
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Health Status</TableHead>
          <TableHead>Collar ID</TableHead>
          <TableHead className="w-[70px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {livestock.map((item) => (
          <TableRow key={item._id}>
            {/* <TableCell>{item._id}</TableCell> */}
            <TableCell>
              <Link href={`/dashboard/livestock/${item._id}`} passHref>
                {item.name}
              </Link>
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.breed}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>
              {(() => {
                const dob = new Date(item.dateOfBirth);
                const now = new Date();
                const diffInMs = now.getTime() - dob.getTime();
                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                const diffInWeeks = Math.floor(diffInDays / 7);
                const diffInMonths = Math.floor(diffInDays / 30);
                const diffInYears = Math.floor(diffInDays / 365);

                if (diffInYears > 0) return `${diffInYears} years`;
                if (diffInMonths > 0) return `${diffInMonths} months`;
                if (diffInWeeks > 0) return `${diffInWeeks} weeks`;
                return `${diffInDays} days`;
              })()}
            </TableCell>
            <TableCell>{item.weight} kg</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={getHealthStatusColor(item.healthStatus)}
              >
                {item.healthStatus}
              </Badge>
            </TableCell>
            <TableCell>{item.collarId}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <View className="mr-2 h-4 w-4" />
                    <Link href={`/dashboard/livestock/${item._id}`} passHref>
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete(item._id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
