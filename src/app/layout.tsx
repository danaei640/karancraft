import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeCustomizer } from "@/components/theme-customizer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "karan-ui — Modern Shadcn Component Registry",
  description: "A modern component library and Shadcn Registry built on Next.js, Base UI, and Tailwind CSS v4.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} style-karan h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof WritableStreamDefaultWriter!=="undefined"){var c=new WeakSet(),oClose=WritableStreamDefaultWriter.prototype.close,oWrite=WritableStreamDefaultWriter.prototype.write;WritableStreamDefaultWriter.prototype.close=function(){if(c.has(this)||this.desiredSize===null)return Promise.resolve();c.add(this);try{return oClose.call(this).catch(function(){})}catch(e){return Promise.resolve()}};WritableStreamDefaultWriter.prototype.write=function(chunk){if(c.has(this)||this.desiredSize===null)return Promise.resolve();try{return oWrite.call(this,chunk).catch(function(){})}catch(e){return Promise.resolve()}}}})();`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-neutral-surface text-neutral-text"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
