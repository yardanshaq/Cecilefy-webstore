"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "rgba(0, 0, 0, 0.9)",
          "--normal-text": "#ffffff",
          "--normal-border": "rgba(255, 255, 255, 0.2)",
        } as React.CSSProperties
      }
      position="bottom-right"
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster };