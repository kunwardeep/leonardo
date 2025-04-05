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
      sessionStorage.clear();
      router.refresh();
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
              <Link href={"/settings"}>User Settings</Link>
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
        <Logo linkTo={"/information"} />
        <LogoText linkTo={"/information"} />
      </Flex>
      {user && (
        <Flex align="center" gap={5} padding={1}>
          <UserName username={user.username} linkTo={"/settings"} />
          <UserMenu username={user.username} logoutUser={removeUser} />
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(Header);
