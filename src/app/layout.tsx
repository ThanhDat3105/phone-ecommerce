import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";

import StoreProvider from "./StoreProvider";
import "@vercel/analytics";
import RefreshToken from "./refreshToken/page";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const metadata: Metadata = {
  title: "Phone E-Commerce",
  description: "Phone e-commerce have everything shoe you want",
  openGraph: {
    images:
      "https://coolstuf.com.pg/wp-content/uploads/2022/10/iPhone-14-PRO-MAX-model-1.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function checkDevTools() {
    // debugger;
  }

  setInterval(checkDevTools, 200);

  return (
    <html lang="en">
      <body>
        <SpeedInsights />
        <StoreProvider>
          <Header />
          <div className="min-h-[100vh]">{children}</div>
          <RefreshToken />
          <Footer />
          <Toaster position="bottom-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
