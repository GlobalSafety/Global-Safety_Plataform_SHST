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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Utilizamos cookies para melhorar a sua experiência. Ao continuar,
          aceita a nossa política de privacidade.
        </p>

        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
