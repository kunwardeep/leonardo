import { Avatar, Flex, Text } from "@chakra-ui/react";
import HomePageIcon from "@/assets/images/r_and_m.png";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/consts";

import UserDetails from "./UserDetails";

const Logo = ({ link }: { link: { to: string; ariaLabel: string } }) => {
  return (
    <Avatar.Root shape="rounded" size="2xl" cursor={"pointer"}>
      <Link href={link.to} aria-label={link.ariaLabel}>
        <Image src={HomePageIcon} alt="Home Page" width={200} height={200} />
      </Link>
    </Avatar.Root>
  );
};

const LogoText = ({ link }: { link: { to: string; ariaLabel: string } }) => {
  return (
    <Link href={link.to} aria-label={link.ariaLabel}>
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

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Flex align="center" justifyContent={"space-between"} padding={1}>
      <Flex align="center" gap={5} padding={1}>
        <Logo link={{ to: PATHS.HOME, ariaLabel: "Go to information page" }} />
        <LogoText
          link={{ to: PATHS.HOME, ariaLabel: "Go to information page" }}
        />
      </Flex>
      {isLoggedIn && <UserDetails />}
    </Flex>
  );
};

export default React.memo(Header);
