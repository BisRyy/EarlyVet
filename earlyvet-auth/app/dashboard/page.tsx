"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import ProtectedRoute from "@/components/protected-route";
import { LivestockTable } from "@/components/livestock/livestock-table";
import { LivestockForm } from "@/components/livestock/livestock-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Livestock, CreateLivestockData, LivestockResponse, LivestockDetails } from "@/lib/types";
import {
  getLivestock,
  createLivestock,
  updateLivestock,
  deleteLivestock,
  getLivestockByOwner,
} from "@/lib/livestock-api";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [livestock, setLivestock] = useState<LivestockDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(
    null
  );

  useEffect(() => {
    if (user && token) {
      fetchLivestock();
    }
  }, [user, token]);

  async function fetchLivestock() {
    try {
      const data = await getLivestockByOwner();
      setLivestock(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch livestock data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: CreateLivestockData) {
    try {
      const newLivestock: LivestockResponse = await createLivestock({
        ...data,
        ownerId: user!._id,
      });
      console.log("newLivestock", newLivestock);
      setLivestock([...livestock, newLivestock.livestock]);
      setFormOpen(false);
      toast({
        title: "Success",
        description: newLivestock.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create livestock",
        variant: "destructive",
      });
    }
  }

  async function handleUpdate(data: CreateLivestockData) {
    if (!selectedLivestock) return;

    try {
      const updated = await updateLivestock(selectedLivestock._id, data);
      setLivestock(
        livestock.map((item) => (item._id === updated._id ? updated : item))
      );
      setFormOpen(false);
      setSelectedLivestock(null);
      toast({
        title: "Success",
        description: "Livestock updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update livestock",
        variant: "destructive",
      });
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteLivestock(id);
      setLivestock(livestock.filter((item) => item._id !== id));
      setDeleteDialogOpen(false);
      setSelectedLivestock(null);
      toast({
        title: "Success",
        description: "Livestock deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete livestock",
        variant: "destructive",
      });
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Livestock Management</h1>
          <Button onClick={() => setFormOpen(true)}>Add Livestock</Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <LivestockTable
            livestock={livestock}
            onEdit={(livestock) => {
              setSelectedLivestock(livestock);
              setFormOpen(true);
            }}
            onDelete={(id) => {
              setSelectedLivestock(
                livestock.find((item) => item._id === id) || null
              );
              setDeleteDialogOpen(true);
            }}
          />
        )}

        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedLivestock ? "Edit" : "Add"} Livestock
              </DialogTitle>
            </DialogHeader>
            <LivestockForm
              initialData={selectedLivestock || undefined}
              onSubmit={selectedLivestock ? handleUpdate : handleCreate}
              onCancel={() => {
                setFormOpen(false);
                setSelectedLivestock(null);
              }}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                livestock record for {selectedLivestock?.name}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedLivestock(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  selectedLivestock && handleDelete(selectedLivestock._id)
                }
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
}
