"use client";

import { useState } from "react";

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("privacy_consent");
  });

  const handleAccept = () => {
    localStorage.setItem("privacy_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">
      <p className="text-sm">
        Este site utiliza cookies para melhorar a experiência do utilizador.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700"
      >
        Aceitar
      </button>
    </div>
  );
}
