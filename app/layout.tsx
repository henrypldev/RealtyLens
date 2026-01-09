import { Geist_Mono, Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { constructMetadata } from "@/lib/constructMetadata";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={outfit.variable} lang="en">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
