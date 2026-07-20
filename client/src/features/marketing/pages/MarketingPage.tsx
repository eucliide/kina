import { Page } from "@/components/layout";

import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { WhatToExpect } from "../components/WhatToExpect";

export function MarketingPage() {
  return (
    <Page>
      <Navigation />
      <Hero />
      <WhatToExpect />
    </Page>
  );
}
