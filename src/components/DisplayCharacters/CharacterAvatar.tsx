import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const DEFAULT_AVATAR_BASE64 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkJCQkKCQoMDAoPEA4QDxUUEhIUFSAXGRcZFyAxHyQfHyQfMSw1KygrNSxOPTc3PU5aTEhMWm5iYm6Kg4q0tPIBCQkJCQoJCgwMCg8QDhAPFRQSEhQVIBcZFxkXIDEfJB8fJB8xLDUrKCs1LE49Nzc9TlpMSExabmJiboqDirS08v/CABEIAAoACgMBIgACEQEDEQH/xAApAAEBAQAAAAAAAAAAAAAAAAAEBQYBAQEAAAAAAAAAAAAAAAAAAAIE/9oADAMBAAIQAxAAAADeVTqnX//EACAQAAICAgAHAAAAAAAAAAAAAAEDAhEAEgQTMTNBcXL/2gAIAQEAAT8Aa1LATKOsaujHFA8pddNRigJI4fYXcvPrFdpfyM//xAAZEQABBQAAAAAAAAAAAAAAAAAAAQIDESL/2gAIAQIBAT8An0jLP//EABgRAQADAQAAAAAAAAAAAAAAAAEAAxFR/9oACAEDAQE/AKwBzs//2Q==";

const CharacterAvatar = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Box
      boxSize={{ base: "70px", md: "85px", lg: "100px" }}
      position="relative"
      borderRadius="full"
      overflow="hidden"
    >
      <Image
        src={src}
        fill
        sizes="(max-width: 768px) 70px, (max-width: 992px) 85px, 100px"
        style={{
          objectFit: "cover",
        }}
        blurDataURL={DEFAULT_AVATAR_BASE64}
        alt={alt}
        placeholder="blur"
      />
    </Box>
  );
};

export default CharacterAvatar;
