import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex flex-col h-screen">
            <VetHeader />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import VetHeader from "./vet-portal/components/vet-header";
