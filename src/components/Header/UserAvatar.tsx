import { defineStyle, Avatar } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useId } from "react";

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

export default UserAvatar;
