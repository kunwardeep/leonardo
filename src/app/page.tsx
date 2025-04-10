"use client";

import dynamic from "next/dynamic";

const ClientSideComponent = dynamic(() => import("@/components/Login"), {
  ssr: false,
});

export default function Page() {
  return <ClientSideComponent />;
}
