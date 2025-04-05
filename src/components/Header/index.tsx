import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../Context/UserContext";
import HomePageIcon from "@/assets/images/r_and_m.png";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useId } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ linkTo }: { linkTo: string }) => {
  return (
    <Avatar.Root shape="rounded" size="2xl" cursor={"pointer"}>
      <Link href={linkTo}>
        <Image
          src={HomePageIcon}
          alt="Home Page"
          layout="intrinsic"
          width={100}
          height={100}
        />
      </Link>
    </Avatar.Root>
  );
};

const LogoText = ({ linkTo }: { linkTo: string }) => {
  return (
    <Link href={linkTo}>
      <Text
        textStyle="4xl"
        mdDown={{ textStyle: "2xl" }}
        cursor={"pointer"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
      >
        Rick and Morty
      </Text>
    </Link>
  );
};

const UserName = ({
  username,
  linkTo,
}: {
  username: string;
  linkTo: string;
}) => {
  return (
    <Link href={linkTo}>
      <Text
        textStyle="1xl"
        hideBelow="md"
        cursor={"pointer"}
        padding={1}
        truncate
        fontWeight="semibold"
        lineClamp="1"
        textAlign={"right"}
      >
        {username}
      </Text>
    </Link>
  );
};

const UserAvatar = ({
  username,
  linkTo,
}: {
  username: string;
  linkTo: string;
}) => {
  const id = useId();

  return (
    <Tooltip
      ids={{ trigger: id }}
      aria-label={"user's name"}
      content={username}
      showArrow
      positioning={{ placement: "bottom" }}
    >
      <Link href={linkTo}>
        <Avatar.Root variant={"subtle"} cursor={"pointer"} ids={{ root: id }}>
          <Avatar.Fallback name={username} />
        </Avatar.Root>
      </Link>
    </Tooltip>
  );
};

const Header = () => {
  const { user } = useUser();

  return (
    <Flex align="center" justifyContent={"space-between"} padding={1}>
      <Flex align="center" gap={5} padding={1}>
        <Logo linkTo={"/information"} />
        <LogoText linkTo={"/information"} />
      </Flex>
      {user && (
        <Flex align="center" gap={5} padding={1}>
          <UserName username={user.username} linkTo={"/settings"} />
          <UserAvatar username={user.username} linkTo={"/settings"} />
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(Header);
