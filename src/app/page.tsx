import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import DNAWaveSection from "@/components/sections/dna-wave-client";
import DNAPulseOnly from "@/components/sections/dna-pulse-client";
import OurBeliefSection from "@/components/sections/our-belief-client";
import CarePlatformSection from "@/components/sections/care-platform";
import FeaturesGrid from "@/components/sections/features-grid";
import OutcomesStats from "@/components/sections/outcomes-stats";
import AudienceSolutions from "@/components/sections/audience-solutions";
import TrustedByLogos from "@/components/sections/trusted-by-logos";
import MemberStories from "@/components/sections/member-stories";
import ContactSection from "@/components/sections/contact";
import CtaFinal from "@/components/sections/cta-final";
import Footer from "@/components/sections/footer";
import PodcastPathways from "@/components/sections/podcast-pathways";
import WhoWeBringTogether from "@/components/sections/who-we-bring-together";
import ContentPrism from "@/components/sections/content-prism";
import PodcastShowcase from "@/components/sections/podcast-showcase";
import PodcastExplainer from "@/components/sections/podcast-explainer";
import StackingCards from "@/components/sections/stacking-cards";
import ProblemSection from "@/components/sections/problem";
import ROIAttentionSection from "@/components/sections/roi-attention";

export default function Home() {
  return (
    <main>
      <Header />
      <div>
        <HeroSection />
        {/* <ProblemSection /> */}
        <CarePlatformSection />
        {/* <ROIAttentionSection /> */}
        <PodcastExplainer />
        <WhoWeBringTogether />
        <StackingCards />
        <PodcastShowcase />
        <OurBeliefSection />
        <DNAWaveSection />
        {/* <AudienceSolutions /> */}
        <PodcastPathways />
        <ContentPrism />
        {/* <FeaturesGrid /> */}
        <ContactSection />

        {/* Bibliography */}
        <div className="bg-[#131d2b] px-6 md:px-12 py-10 border-t border-[#fdffd6]/10">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-[#fdffd6]/30 text-[11px] font-semibold uppercase tracking-[0.15em] mb-4">Sources</p>
            <div className="flex flex-col gap-2">
              {[
                { n: '1', label: 'Johnson & Johnson Oncology Care Index, conducted with The Harris Poll, 2025', url: 'https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly' },
                { n: '2', label: 'CDC, Health Literacy Talking Points, Centers for Disease Control and Prevention', url: 'https://www.cdc.gov/health-literacy/php/about/tell-others.html' },
                { n: '3', label: 'Grammarly & Harris Poll, The State of Business Communication, 2022', url: 'https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/' },
                { n: '4', label: 'Bower & Clark, Narrative Stories as Mediators for Serial Learning, Stanford University / Psychonomic Science, 1969', url: 'https://link.springer.com/article/10.3758/BF03332778' },
                { n: '5', label: 'Signal Hill Insights, Measuring the Success of Branded Podcasts, 2024', url: 'https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/' },
                { n: '6', label: 'Cumulus Media & Signal Hill Insights, Podcast Download — Fall 2025', url: 'https://cumuluspodcastnetwork.com/cumulus-media-podcast-download-fall-2025/' },
                { n: '7', label: 'CoHost, Podcasting Unwrapped 2025', url: 'https://www.cohostpodcasting.com/resources/podcasting-unwrapped-2025' },
              ].map(({ n, label, url }) => (
                <a
                  key={n}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] italic hover:underline transition-all flex gap-2"
                  style={{ color: 'rgba(253,255,214,0.35)' }}
                >
                  <span className="flex-shrink-0">{n}.</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
