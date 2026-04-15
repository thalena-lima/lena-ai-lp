import { BeforeAfter } from "@/components/before-after";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { SocialProof } from "@/components/social-proof";
import { FormModal } from "@/components/form-modal";

export default function Home() {
  return (
    <>
      <FormModal />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <BeforeAfter />
        <Metrics />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
