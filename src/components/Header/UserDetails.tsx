"use client";

import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { PATHS } from "@/consts";
import UserMenu from "./UserMenu";
import { useUser } from "../Context/UserContext";

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

const UserDetails = () => {
  const { user, logout } = useUser();

  if (!user) {
    // maybe a Loader
    return;
  }

  return (
    <Flex align="center" gap={5} padding={1}>
      <UserName
        username={user.username}
        link={{ to: PATHS.SETTINGS, ariaLabel: "Go to settings page" }}
      />
      <UserMenu username={user.username} logoutUser={logout} />
    </Flex>
  );
};

export default UserDetails;
