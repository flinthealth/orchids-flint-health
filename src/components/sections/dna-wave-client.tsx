"use client";

import dynamic from "next/dynamic";

const DNAWaveSection = dynamic(() => import("./dna-wave"), { ssr: true });

export default DNAWaveSection;
