import Image from "next/image";
import React from "react";

const DEFAULT_AVATAR_BASE64 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkJCQkKCQoMDAoPEA4QDxUUEhIUFSAXGRcZFyAxHyQfHyQfMSw1KygrNSxOPTc3PU5aTEhMWm5iYm6Kg4q0tPIBCQkJCQoJCgwMCg8QDhAPFRQSEhQVIBcZFxkXIDEfJB8fJB8xLDUrKCs1LE49Nzc9TlpMSExabmJiboqDirS08v/CABEIAAoACgMBIgACEQEDEQH/xAApAAEBAQAAAAAAAAAAAAAAAAAEBQYBAQEAAAAAAAAAAAAAAAAAAAIE/9oADAMBAAIQAxAAAADeVTqnX//EACAQAAICAgAHAAAAAAAAAAAAAAEDAhEAEgQTMTNBcXL/2gAIAQEAAT8Aa1LATKOsaujHFA8pddNRigJI4fYXcvPrFdpfyM//xAAZEQABBQAAAAAAAAAAAAAAAAAAAQIDESL/2gAIAQIBAT8An0jLP//EABgRAQADAQAAAAAAAAAAAAAAAAEAAxFR/9oACAEDAQE/AKwBzs//2Q==";

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
      placeholder="blur"
      blurDataURL={DEFAULT_AVATAR_BASE64}
    />
  );
};

export default React.memo(CharacterAvatar);
