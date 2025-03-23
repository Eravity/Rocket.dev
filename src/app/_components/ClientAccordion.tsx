"use client";

import dynamic from "next/dynamic";

// Dynamically import Accordion with SSR disabled in this client component wrapper.
const Accordion = dynamic(() => import("./Accordion"), { ssr: false });

export default Accordion;
