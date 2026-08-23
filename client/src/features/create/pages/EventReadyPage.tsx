import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Share2 } from "lucide-react";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";
import { getJoinedEvent } from "@/features/join/services/joinSession";

export function EventReadyPage() {
  const navigate = useNavigate();
  const event = getJoinedEvent();

  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    if (!event) {
      navigate("/create");
      return;
    }

    // Check if Web Share API is supported
    setShareSupported(typeof navigator.share !== "undefined");
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  const joinUrl = `${window.location.origin}/join?code=${event.code}`;

  async function handleCopy() {
    if (!event) return;
    
    try {
      await navigator.clipboard.writeText(event.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  async function handleShare() {
    if (!event) return;
    
    try {
      await navigator.share({
        title: "Join my Ki meetup",
        text: `Join my Ki meetup with code: ${event.code}`,
        url: joinUrl,
      });
    } catch (error) {
      // User cancelled or share failed
      console.log("Share cancelled or failed:", error);
    }
  }

  function handleContinue() {
    navigate("/create/participate");
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col items-center justify-center py-16">
            <div className="w-full max-w-md space-y-8 text-center">
              {/* Success heading */}
              <div className="space-y-3">
                <Heading>Event ready</Heading>
                <Text className="text-lg font-medium text-white/90">
                  {event.name}
                </Text>
                <Text className="text-white/60">
                  Share this code or QR with others to join
                </Text>
              </div>

              {/* QR Code */}
              <div className="mx-auto w-fit rounded-2xl bg-white p-6">
                <QRCodeSVG
                  value={joinUrl}
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>

              {/* Event code display */}
              <div className="space-y-2">
                <Text className="text-sm text-white/40">Event code</Text>
                <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4">
                  <Text className="font-mono text-2xl font-semibold tracking-wider">
                    {event.code}
                  </Text>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy code
                    </>
                  )}
                </Button>

                {shareSupported && (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share event
                  </Button>
                )}
              </div>

              {/* Continue to participation choice */}
              <div className="pt-4">
                <Button className="w-full" onClick={handleContinue}>
                  Continue
                </Button>
              </div>
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
