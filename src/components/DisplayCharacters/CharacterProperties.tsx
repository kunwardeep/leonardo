import { ICharacterCard } from "./CharacterCard";
import { Flex, Icon } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { RiGenderlessLine as GenderLessIcon } from "react-icons/ri";
import { BsGenderMale as MaleIcon } from "react-icons/bs";
import { BsGenderFemale as FemaleIcon } from "react-icons/bs";
import { FaGenderless as UnknownIcon } from "react-icons/fa";
import { CiFaceSmile as AliveIcon } from "react-icons/ci";
import { CiFaceMeh as UnknownStatusIcon } from "react-icons/ci";
import { CiFaceFrown as DeadIcon } from "react-icons/ci";
import { PiPersonLight as HumanIcon } from "react-icons/pi";
import { PiAlienThin as AlienIcon } from "react-icons/pi";
import { BsPersonSlash as UnknownSpeciesIcon } from "react-icons/bs";

type ICharacterProperties = Pick<
  ICharacterCard,
  "species" | "status" | "gender"
>;

const SpeciesIcon = ({ species }: { species: string }) => {
  const icon = (species: string) => {
    switch (species) {
      case "Human":
        return <HumanIcon />;
      case "Alien":
        return <AlienIcon />;
      default:
        return <UnknownSpeciesIcon />;
    }
  };
  return (
    <Tooltip
      aria-label={`Species: ${species}`}
      content={`Species: ${species}`}
      showArrow
      positioning={{ placement: "top" }}
    >
      <Icon size="lg">{icon(species)}</Icon>
    </Tooltip>
  );
};

const StatusIcon = ({ status }: { status: string }) => {
  const icon = (status: string) => {
    switch (status) {
      case "Alive":
        return <AliveIcon />;
      case "Dead":
        return <DeadIcon />;
      default:
        return <UnknownStatusIcon />;
    }
  };
  return (
    <Tooltip
      aria-label={`Status: ${status}`}
      content={`Status: ${status}`}
      showArrow
      positioning={{ placement: "top" }}
    >
      <Icon size="lg">{icon(status)}</Icon>
    </Tooltip>
  );
};

const GenderIcon = ({ gender }: { gender: string }) => {
  const icon = (gender: string) => {
    switch (gender) {
      case "Female":
        return <FemaleIcon />;
      case "Male":
        return <MaleIcon />;
      case "Genderless":
        return <GenderLessIcon />;
      default:
        return <UnknownIcon />;
    }
  };
  return (
    <Tooltip
      aria-label={`Gender: ${gender}`}
      content={`Gender: ${gender}`}
      showArrow
      positioning={{ placement: "top" }}
    >
      <Icon size="lg">{icon(gender)}</Icon>
    </Tooltip>
  );
};

const CharacterProperties = ({
  species,
  status,
  gender,
}: ICharacterProperties) => {
  return (
    <Flex gap={5}>
      <GenderIcon gender={gender} />
      <StatusIcon status={status} />
      <SpeciesIcon species={species} />
    </Flex>
  );
};

export default CharacterProperties;
