"use client";

import CharacterInfo from "@/components/CharacterDetails/CharacterInfo";
import { useParams } from "next/navigation";

export default function Page() {
  const props = useParams();
  const id = Number(props.id);
  return <CharacterInfo characterId={id} />;
}
