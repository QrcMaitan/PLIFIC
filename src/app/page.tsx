import { CustomCursor } from "@/components/custom-cursor";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Platforms } from "@/components/platforms";
import { ConnectedAccounts } from "@/components/connected-accounts";
import { Trust } from "@/components/trust";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PageIntro } from "@/components/page-intro";

export default function Home() {
  return (
    <SmoothScroll>
      <PageIntro />
      <CustomCursor />
      <div className="fixed inset-x-0 top-0 z-50">
        <Header />
      </div>
      <main className="flex-1">
        <Hero />
        <Platforms />
        {/* Scopes the sticky "como-funciona" section's containing block to
            just itself + Trust — otherwise it stays pinned for the combined
            height of every section after it in <main> (including
            ConnectedAccounts), releasing far too late and reappearing right
            before the footer. */}
        <div className="relative">
          <HowItWorks />
          <Trust />
        </div>
        <ConnectedAccounts />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
