import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import IgniteSection from "@/components/sections/ignite";
import DNAWaveSection from "@/components/sections/dna-wave-client";
import DNAPulseOnly from "@/components/sections/dna-pulse-client";
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
import PodcastPulse from "@/components/sections/podcast-pulse";
import ContentPrism from "@/components/sections/content-prism";
import PodcastShowcase from "@/components/sections/podcast-showcase";
import WhatWeCreate from "@/components/sections/what-we-create";
import PodcastExplainer from "@/components/sections/podcast-explainer";
import WhySeriesWork from "@/components/sections/why-series-work";
import SeriesReach from "@/components/sections/series-reach";
import SeriesCost from "@/components/sections/series-cost";
import StackingCards from "@/components/sections/stacking-cards";
import ProblemSection from "@/components/sections/problem";
import ROIAttentionSection from "@/components/sections/roi-attention";
import FAQSection from "@/components/sections/faq";
import StatInterstitial from "@/components/sections/stat-interstitial";
import ContentBridge from "@/components/sections/content-bridge";
import MissionSection from "@/components/sections/mission";
import SeriousAboutSeries from "@/components/sections/serious-about-series";
import ProcessSection from "@/components/sections/process-section";

export default function Home() {
  return (
    <main>
      <Header />
      <div>
        <HeroSection />
        <IgniteSection />
        <SeriousAboutSeries />
        <PodcastShowcase />
        <WhatWeCreate />
        <ContentBridge />
        <PodcastExplainer />
        <StackingCards />
        {/* <CarePlatformSection /> */}
        <ProcessSection />
        {/* <WhySeriesWork /> */}
        {/* <MissionSection /> */}
        {/* <ProblemSection /> */}
        {/* <StatInterstitial /> */}
        {/* <ROIAttentionSection /> */}
        {/* <SeriesReach /> */}
        {/* <PodcastPathways /> */}
        <DNAWaveSection />
        {/* <AudienceSolutions /> */}
        {/* <PodcastPulse /> */}
        {/* <ContentPrism /> */}
        {/* <FeaturesGrid /> */}
        <FAQSection />
        <ContactSection />

        {/* Bibliography */}
        <div className="bg-[#16171b] px-6 md:px-12 py-10 border-t border-white/10">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-white/30 text-[11px] font-semibold uppercase tracking-[0.15em] mb-4">Sources</p>
            <div className="flex flex-col gap-2">
              {[
                { n: '1', label: 'Bower & Clark, Narrative Stories as Mediators for Serial Learning, Stanford University / Psychonomic Science, 1969', url: 'https://link.springer.com/article/10.3758/BF03332778' },
                { n: '2', label: "Paul J. Zak, Why Your Brain Loves Good Storytelling, Harvard Business Review, October 2014. Zak's research at Claremont Graduate University demonstrated that narrative content triggers oxytocin release, driving empathy, trust, and action. Also published in Nature (2005) and Scientific American (2008).", url: 'https://hbr.org/2014/10/why-your-brain-loves-good-storytelling' },
                { n: '3', label: 'Signal Hill Insights, Measuring the Success of Branded Podcasts, 2024', url: 'https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/' },
                { n: '4', label: 'Cumulus Media, & Signal Hill Insights. (2025, November). Podcast download fall 2025 report. Westwood One. westwoodone.com', url: 'https://www.westwoodone.com/wp-content/uploads/2025/11/Cumulus-Media-and-Signal-Hill-Insights-Podcast-Download-Fall-2025_WWO.pdf' },
                { n: '5', label: 'Centers for Disease Control and Prevention, Health Literacy: Tell Others', url: 'https://www.cdc.gov/health-literacy/php/about/tell-others.html' },
                { n: '6', label: 'Managed Healthcare Executive, Survey Reveals Cancer Doctors Struggle to Keep Up as Treatments Advance Quickly', url: 'https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly' },
                { n: '7', label: 'Agility PR, Bad Connection: Study Finds Poor Communication Costs Businesses $1.2 Trillion Annually', url: 'https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/' },
              ].map(({ n, label, url }) => (
                <a
                  key={n}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] italic hover:underline transition-all flex gap-2"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
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
