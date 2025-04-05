import { Image } from "@chakra-ui/react";
import React from "react";

const CharacterAvatar = ({
  src,
  size,
}: {
  size: number;
  src: string;
  alt: string;
}) => {
  return (
    <Image
      className="rounded-full"
      src={src}
      width={size}
      height={size}
      alt="Picture of the user"
    />
  );
};

export default React.memo(CharacterAvatar);
