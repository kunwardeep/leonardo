import { Avatar, Flex, Mark, Text } from "@chakra-ui/react";
import { useUser } from "../Context/UserContext";

const Header = () => {
  const { user } = useUser();

  if (user) {
    return (
      <Flex align="center" justifyContent={"flex-start"} gap={5} padding={1}>
        <Avatar.Root variant={"subtle"}>
          <Avatar.Fallback name={user.username} />
        </Avatar.Root>
        <Text>
          Welcome <Mark variant={"text"}>{user.username}</Mark>
        </Text>
      </Flex>
    );
  }
};

export default Header;
