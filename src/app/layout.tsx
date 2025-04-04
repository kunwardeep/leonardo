import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider as ChakraProvider } from "@/components/ChakraUi/provider";
import { UserProvider } from "@/components/Context/UserContext";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty App",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProviderWrapper>
          <ChakraProvider>
            <UserProvider> {children}</UserProvider>
          </ChakraProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
