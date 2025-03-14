import type { Metadata } from "next"
import TelemedicineLayout from "./telemedicine-layout"

export const metadata: Metadata = {
  title: "EarlyVet - Telemedicine",
  description: "Connect with veterinarians for your livestock health needs",
}

export default function TelemedicinePage() {
  return <TelemedicineLayout />
}

