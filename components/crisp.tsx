"use client";

import { useEffect } from "react";

const CRISP_WEBSITE_ID = "7637cece-c727-4d0f-9e5a-941e0aaa7634";

export default function CrispChat() {
  useEffect(() => {
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}