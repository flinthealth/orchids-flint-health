"use client";

import dynamic from "next/dynamic";

const OurBeliefSection = dynamic(
  () => import("./dna-wave").then(m => ({ default: m.OurBeliefSection })),
  { ssr: true }
);

export default OurBeliefSection;
