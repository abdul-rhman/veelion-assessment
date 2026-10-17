import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/app/ReduxProvider";
import { AppNav } from "@/components/layout/AppNav";

export const metadata: Metadata = {
  title: "Tackboard",
  description: "A calm board for your tasks, activity, and reports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inter:wght@400..700&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppNav />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
