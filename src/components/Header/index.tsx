import { Avatar, Flex, Mark, Text } from "@chakra-ui/react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/navigation";
import HomePageIcon from "@/assets/images/r_and_m.png";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useId } from "react";
import React from "react";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const id = useId();

  const handleSettingsPageOnClick = () => {
    router.push("/settings");
  };

  const handleHomePageOnClick = () => {
    router.push("/information");
  };

  return (
    <Flex align="center" justifyContent={"space-between"} padding={1}>
      <Flex align="center" gap={5} padding={1}>
        <Avatar.Root
          shape="rounded"
          size="2xl"
          onClick={handleHomePageOnClick}
          cursor={"pointer"}
        >
          <Image
            src={HomePageIcon}
            alt="Home Page"
            layout="intrinsic"
            width={100}
            height={100}
          />
        </Avatar.Root>
        <Text
          textStyle="4xl"
          onClick={handleHomePageOnClick}
          cursor={"pointer"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
        >
          Rick and Morty
        </Text>
      </Flex>
      {user && (
        <Flex align="center" gap={5} padding={1}>
          <Text
            textStyle="1xl"
            hideBelow="md"
            onClick={handleSettingsPageOnClick}
            cursor={"pointer"}
            padding={1}
            truncate
            fontWeight="semibold"
            lineClamp="1"
            textAlign={"right"}
          >
            {user.username}
          </Text>
          <Tooltip
            ids={{ trigger: id }}
            aria-label={"user's name"}
            content={user.username}
            showArrow
            positioning={{ placement: "bottom" }}
          >
            <Avatar.Root
              variant={"subtle"}
              onClick={handleSettingsPageOnClick}
              cursor={"pointer"}
              ids={{ root: id }}
            >
              <Avatar.Fallback name={user.username} />
            </Avatar.Root>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(Header);
