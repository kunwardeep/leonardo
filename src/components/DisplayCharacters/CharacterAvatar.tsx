import Image from "next/image";
import React from "react";

const CharacterAvatar = ({
  src,
  size,
  alt,
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
      alt={alt}
    />
  );
};

export default React.memo(CharacterAvatar);
