"use client";

import dynamic from "next/dynamic";

const DNAPulseOnly = dynamic(
  () => import("./dna-wave").then(m => ({ default: m.DNAPulseOnly })),
  { ssr: true }
);

export default DNAPulseOnly;
