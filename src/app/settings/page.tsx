"use client";

import dynamic from "next/dynamic";

const ClientSideComponent = dynamic(() => import("@/components/UserSettings"), {
  ssr: false,
});

export default function Page() {
  return <ClientSideComponent />;
}
