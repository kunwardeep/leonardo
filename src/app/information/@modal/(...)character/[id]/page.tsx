"use client";

import { CharacterDetailsTry } from "@/components/CharacterDetails/";
import { useParams } from "next/navigation";

export default function Page() {
  const props = useParams();
  const id = Number(props.id);
  console.log("PROPS---", props);
  return <CharacterDetailsTry characterId={id} modalOpen={true} />;
}
