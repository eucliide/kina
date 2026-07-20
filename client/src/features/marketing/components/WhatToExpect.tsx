import { Container } from "@/components/layout";

const steps = [
  "Join with a QR code or meeting code.",
  "Choose someone you'd like to talk with.",
  "Receive one thoughtful question.",
  "Have a conversation.",
  "Connect with someone new when you're ready.",
];

export function WhatToExpect() {
  return (
    <section className="pb-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            What to expect
          </h2>

          <div className="mt-10 space-y-8">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-6 border-t border-slate-800 pt-8"
              >
                <span className="w-10 text-sm text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-lg leading-8 text-slate-200">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
