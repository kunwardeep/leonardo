import { Image } from "@chakra-ui/react";
import React from "react";

const CharacterAvatar = ({ src }: { src: string; alt: string }) => {
  return (
    <Image
      className="rounded-full"
      src={src}
      width={100}
      height={100}
      alt="Picture of the user"
    />
  );
};

export default React.memo(CharacterAvatar);
