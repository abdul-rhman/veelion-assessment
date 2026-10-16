import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/app/ReduxProvider";

export const metadata: Metadata = {
  title: "VeeLion Frontend Assessment",
  description: "Task dashboard and activity feed modules",
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
          href="https://fonts.googleapis.com/css2?family=Edu+QLD+Hand:wght@400..700&family=Nunito:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
