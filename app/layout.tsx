import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Password Generator | Create Strong, Secure Passwords",
  description: "Generate strong, secure passwords with our free online password generator. Copy, paste, and download your custom passwords easily.",
  keywords: "password generator, strong passwords, secure passwords, random password, password security, copy password, download password",
  openGraph: {
    title: "Password Generator | Create Strong, Secure Passwords",
    description: "Generate strong, secure passwords with our free online password generator. Copy, paste, and download your custom passwords easily.",
    url: "https://passwordgenrater.vercel.app/",
    siteName: "Password Generator",
    images: [
      {
        url: "https://passwordgenrater.vercel.app/",
        width: 1200,
        height: 630,
        alt: "Password Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator | Create Strong, Secure Passwords",
    description: "Generate strong, secure passwords with our free online password generator. Copy, paste, and download your custom passwords easily.",
    images: ["https://passwordgenrater.vercel.app/"],
    creator: "@YourTwitterHandle",
  },
  robots: "index, follow",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://passwordgenrater.vercel.app/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
