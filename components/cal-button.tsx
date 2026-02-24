"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void; 
}

export default function CalButton({ className, children, onClick }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "diagnostico" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      // Trackear cuando alguien confirma una reserva
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "booking_confirmed", {
              event_category: "engagement",
              event_label: "Cal.com - Diagnóstico",
            });
          }
        },
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="diagnostico"
      data-cal-link="landaetastudio/diagnostico"
      data-cal-config='{"layout":"month_view"}'
      className={className}
      onClick={onClick}       
    >
      {children}
    </button>
  );
}