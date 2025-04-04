import { Avatar, Flex, Mark, Text } from "@chakra-ui/react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/navigation";
import HomePageIcon from "@/assets/images/r_and_m.png";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useId } from "react";

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

  if (user) {
    return (
      <Flex align="center" justifyContent={"space-between"} gap={5} padding={1}>
        <Flex align="center" gap={5} padding={1}>
          <Avatar.Root
            shape="rounded"
            size="2xl"
            onClick={handleHomePageOnClick}
            cursor={"pointer"}
          >
            <Avatar.Image src={HomePageIcon.src} alt="Home Page" />
          </Avatar.Root>
          <Text
            textStyle="4xl"
            onClick={handleHomePageOnClick}
            cursor={"pointer"}
          >
            Rick and Morty
          </Text>
        </Flex>
        <Flex align="center" gap={5} padding={1}>
          <Text hideBelow="md">
            Welcome{" "}
            <Mark
              variant={"text"}
              onClick={handleSettingsPageOnClick}
              cursor={"pointer"}
            >
              {user.username}
            </Mark>
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
      </Flex>
    );
  }
};

export default Header;
