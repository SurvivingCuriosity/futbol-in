import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";
import { CTA } from "./Landing/cta";
import { Features } from "./Landing/features";
import { Footer } from "./Landing/footer";
import { Hero } from "./Landing/hero";
import { HowItWorks } from "./Landing/how-it-works";
import { Ranking } from "./Landing/ranking";

export default async function LandingPage() {
  const spots = await SpotService.getAll();
  const users = await UserService.getAll();

  return (
    <main className="min-h-screen">
      <Hero spots={spots} users={users.length} />
      <Features />
      <HowItWorks />
      <Ranking />
      <CTA />
      <Footer />
    </main>
  );
}
