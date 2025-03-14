import type { Metadata } from "next"
import VetPortalLayout from "./vet-portal-layout"

export const metadata: Metadata = {
  title: "EarlyVet - Veterinarian Portal",
  description: "Manage your telemedicine appointments and patient care",
}

export default function VetPortalPage() {
  return <VetPortalLayout />
}

