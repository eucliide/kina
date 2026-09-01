import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center py-20">
      <Container>
        <motion.div 
          className="relative max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Every conversation
            <br />
            starts somewhere.
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-white/50 sm:mt-6 sm:text-lg sm:leading-8">
            One thoughtful question is enough.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3.5 sm:mt-10 sm:gap-4">
            <Link to="/join">
              <Button className="px-7 py-2.5 text-base sm:px-8 sm:py-3">
                Join a gathering
              </Button>
            </Link>

            <Link 
              to="/create"
              className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <span>Host a gathering</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
