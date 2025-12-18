"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar se o utilizador já consentiu
    const hasConsented = localStorage.getItem("privacy_consent");
    setShowBanner(!hasConsented);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacy_consent", "true");
    localStorage.setItem("consent_date", new Date().toISOString());
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("privacy_consent", "false");
    localStorage.setItem("consent_date", new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            Utilizamos cookies e dados pessoais para melhorar a sua experiência. Leia a nossa{" "}
            <Link href="/politica-de-privacidade" className="underline hover:text-gray-300">
              Política de Privacidade
            </Link>
            {" "}e{" "}
            <Link href="/politica-de-cookies" className="underline hover:text-gray-300">
              Política de Cookies
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
          >
            Rejeitar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

