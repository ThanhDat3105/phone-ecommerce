"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "sonner";
import "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <Provider store={store}>
          {children}
          <Toaster position="bottom-center" />
        </Provider>
      </body>
    </html>
  );
}
