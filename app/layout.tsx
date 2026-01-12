import { NuqsAdapter } from "nuqs/adapters/next/app";
import { constructMetadata } from "@/lib/constructMetadata";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

// const outfit = Outfit({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });
const _geist = Geist({ variable: "--font-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_geist.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
