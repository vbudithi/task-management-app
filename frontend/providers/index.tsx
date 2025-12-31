"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#1f2937",
            color: "#fff",
            fontSize: "14px",
            marginTop: "2rem",
          },
          className: "relative overflow-hidden",
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export default Providers;