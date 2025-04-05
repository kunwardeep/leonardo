"use client";

import Link from "next/link";
import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const { user, userLoading } = useUser();
  const router = useRouter();

  return (
    <Flex padding={10} gap={2}>
      {!userLoading && !user ? (
        <>
          <Text>You have been logged out</Text>
          <Text fontWeight="bold">
            <Link href={"/"}>Click here to log back</Link>
          </Text>
        </>
      ) : (
        <Skeleton height="5" width="50%" />
      )}
    </Flex>
  );
};

export default Logout;
