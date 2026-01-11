import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
    chatbaseConfig?: any;
  }
}

export function ChatbaseWidget() {
  useEffect(() => {
    const chatbotId = "AhMBXsIzw81G_HG0Lm2OI";
    if (typeof window === "undefined") return;

    window.chatbaseConfig = {
      chatbotId,
      domain: "www.chatbase.co",
      auto_open_chat_window_after: "no",
      align_chat_button: "right",
    };

    const existing = document.getElementById("chatbase-embed");
    if (existing) return;

    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      const shim: any = (...args: any[]) => {
        if (!shim.q) shim.q = [];
        shim.q.push(args);
      };
      window.chatbase = new Proxy(shim, {
        get(target: any, prop: any) {
          if (prop === "q") return target.q;
          return (...a: any[]) => target(prop, ...a);
        },
      });
    }

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.id = "chatbase-embed";
    script.setAttribute("chatbotId", chatbotId);
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);
  }, []);

  return null;
}
