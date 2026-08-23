import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import { X } from "lucide-react";

import { Button, Text } from "@/components/ui";

interface QRScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    let mounted = true;

    async function startScanning() {
      if (!videoRef.current) return;

      setIsScanning(true);
      setError(null);

      const reader = new BrowserQRCodeReader();
      readerRef.current = reader;

      try {
        // Request camera permission and start scanning
        const controls = await reader.decodeFromVideoDevice(
          undefined, // Use default camera
          videoRef.current,
          (result, error) => {
            if (!mounted) return;

            if (result) {
              const text = result.getText();
              handleQRDetected(text);
            }

            // Ignore scan errors (they happen continuously while scanning)
            if (error && !(error.name === "NotFoundException")) {
              console.error("QR scan error:", error);
            }
          }
        );

        // Store controls for cleanup
        if (mounted) {
          readerRef.current = reader;
        } else {
          controls.stop();
        }
      } catch (err) {
        if (!mounted) return;

        console.error("Camera access error:", err);
        
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setError("Camera access was denied. Please enable camera access in your browser settings.");
          } else if (err.name === "NotFoundError") {
            setError("No camera found on this device.");
          } else {
            setError("Unable to access camera.");
          }
        } else {
          setError("Camera scanning is not supported on this device.");
        }
      }
    }

    startScanning();

    return () => {
      mounted = false;
      if (readerRef.current) {
        readerRef.current.reset();
        readerRef.current = null;
      }
    };
  }, []);

  function handleQRDetected(text: string) {
    // Stop scanning
    if (readerRef.current) {
      readerRef.current.reset();
    }

    // Extract event code from QR
    const code = extractEventCode(text);
    
    if (code) {
      onScan(code);
    } else {
      setError("This doesn't look like a Ki event QR code.");
      setIsScanning(false);
    }
  }

  function extractEventCode(qrText: string): string | null {
    // Try to extract from URL: /join?code=KI-XXXXX
    const urlMatch = qrText.match(/[?&]code=([A-Z0-9-]+)/i);
    if (urlMatch) {
      return urlMatch[1];
    }

    // Check if it's a plain event code (KI-XXXXX format)
    if (/^KI-[A-Z0-9]+$/i.test(qrText.trim())) {
      return qrText.trim().toUpperCase();
    }

    return null;
  }

  function handleManualEntry() {
    if (readerRef.current) {
      readerRef.current.reset();
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md space-y-6 p-6">
        {/* Header */}
        <div className="space-y-2 text-center text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Scan QR code</h2>
            <button
              onClick={handleManualEntry}
              className="rounded-lg p-2 hover:bg-white/10 transition-colors"
              aria-label="Close scanner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <Text className="text-white/60">
            Point your camera at the event QR code
          </Text>
        </div>

        {/* Camera preview */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            className="h-[400px] w-full object-cover"
            playsInline
            muted
          />
          
          {/* Scanning overlay */}
          {isScanning && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 rounded-2xl border-2 border-white/50 shadow-lg" />
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="space-y-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <Text className="text-sm text-red-300">{error}</Text>
          </div>
        )}

        {/* Manual entry option */}
        <div className="space-y-3 text-center">
          <div className="flex items-center gap-3 text-xs text-white/25">
            <span className="h-px flex-1 bg-white/10" />
            or
            <span className="h-px flex-1 bg-white/10" />
          </div>
          
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleManualEntry}
          >
            Enter code manually
          </Button>
        </div>
      </div>
    </div>
  );
}
