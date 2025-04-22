"use client";

import { PATHS } from "@/consts";
import { Menu, IconButton, Portal } from "@chakra-ui/react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

const UserMenu = ({
  username,
  logoutUser,
}: {
  username: string;
  logoutUser: () => Promise<void>;
}) => {
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
              onClick={async () => await logoutUser()}
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

export default UserMenu;
