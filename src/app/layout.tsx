import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import AuthProvider from "@/components/shared/AuthProvider";

export const metadata: Metadata = {
  title: "EduCore LMS Portal",
  description: "A Learning Management System portal for students, instructors, and team leads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
  <AuthProvider>{children}</AuthProvider>
</ThemeProvider>
      </body>
    </html>
  );
}
