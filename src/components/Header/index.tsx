"use client";

import { Avatar, defineStyle, Flex, IconButton, Text } from "@chakra-ui/react";
import { useUser } from "@/components/Context/UserContext";
import HomePageIcon from "@/assets/images/r_and_m.png";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useId } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/consts";

const UserMenu = ({
  username,
  logoutUser,
}: {
  username: string;
  logoutUser: () => boolean;
}) => {
  const router = useRouter();

  const handleLogoutUser = () => {
    const logoutSuccess = logoutUser();
    if (logoutSuccess) {
      router.push("/");
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton aria-label="User menu " rounded={"full"} variant={"ghost"}>
          <UserAvatar username={username} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item asChild value="user-settings">
              <Link href={PATHS.SETTINGS} aria-label={"Go to User Settings"}>
                User Settings
              </Link>
            </Menu.Item>
            <Menu.Item
              onClick={handleLogoutUser}
              value="logout"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
            >
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

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

const UserName = ({
  username,
  link,
}: {
  username: string;
  link: {
    to: string;
    ariaLabel: string;
  };
}) => {
  return (
    <Link href={link.to} aria-label={link.ariaLabel}>
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

const UserAvatar = ({ username }: { username: string }) => {
  const id = useId();
  const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "colorPalette.500",
    outlineOffset: "2px",
    outlineStyle: "solid",
  });

  return (
    <Tooltip
      ids={{ trigger: id }}
      aria-label={"user's name"}
      content={username}
      showArrow
      positioning={{ placement: "bottom" }}
    >
      <Avatar.Root
        variant={"subtle"}
        cursor={"pointer"}
        ids={{ root: id }}
        css={ringCss}
      >
        <Avatar.Fallback name={username} />
      </Avatar.Root>
    </Tooltip>
  );
};

const Header = () => {
  const { user, removeUser } = useUser();

  return (
    <Flex align="center" justifyContent={"space-between"} padding={1}>
      <Flex align="center" gap={5} padding={1}>
        <Logo link={{ to: PATHS.HOME, ariaLabel: "Go to information page" }} />
        <LogoText
          link={{ to: PATHS.HOME, ariaLabel: "Go to information page" }}
        />
      </Flex>
      {user && (
        <Flex align="center" gap={5} padding={1}>
          <UserName
            username={user.username}
            link={{ to: PATHS.SETTINGS, ariaLabel: "Go to settings page" }}
          />
          <UserMenu username={user.username} logoutUser={removeUser} />
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(Header);
