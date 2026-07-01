import { DemoBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Simulator } from "@/components/simulator";
import { HowItWorks } from "@/components/how-it-works";
import { Platforms } from "@/components/platforms";
import { Trust } from "@/components/trust";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <Platforms />
        <Simulator />
        <HowItWorks />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
