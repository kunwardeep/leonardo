"use client";

import { Button, Card, Flex, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { vestResolver } from "@hookform/resolvers/vest";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  VALIDATION_FIELDS,
  validationSuite,
} from "@/utils/userDetailsValidation";
import React from "react";

const Login = () => {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();
  const userNameDefaultValue = { [VALIDATION_FIELDS.USERNAME]: "" };
  const jobTitleDefaultValue = { [VALIDATION_FIELDS.JOB_TITLE]: "" };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: vestResolver(validationSuite),
    defaultValues: { userNameDefaultValue, jobTitleDefaultValue },
    mode: "onBlur",
  });

  const userLoggedIn = useMemo(() => !userLoading && user, [user, userLoading]);

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/information");
    }
  }, [router, userLoggedIn]);

  if (userLoading) {
    return;
  }

  const handleOnSubmit = (data: { [x: string]: string }) => {
    // TODO: Stop multiple submit
    const username = data[VALIDATION_FIELDS.USERNAME];
    const jobTitle = data[VALIDATION_FIELDS.JOB_TITLE];
    if (username && jobTitle) {
      const saved = setUser({ username, jobTitle });
      if (saved) {
        router.push("/information");
      } else {
        // TODO: Display some error
        console.log("Unable to save");
      }
    }
  };

  const handleOnClear = () => {
    reset();
  };

  if (!userLoggedIn) {
    return (
      // <Flex align="center" justify="center" className="bg-gray-100 h-dvh w-dvw">

      <Flex align="center" justify="center">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Card.Root size="lg" minW="lg">
            <Card.Header>
              <Card.Title>Sign up</Card.Title>
              <Card.Description>
                Fill in the details to use the App
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <Stack w="full">
                <InputField
                  registration={register(VALIDATION_FIELDS.USERNAME)}
                  label={"Username"}
                  placeholder={"Enter your username"}
                  error={errors[VALIDATION_FIELDS.USERNAME]?.message}
                />
                <InputField
                  registration={register(VALIDATION_FIELDS.JOB_TITLE)}
                  label={"Job Title"}
                  placeholder={"Enter your job title"}
                  error={errors[VALIDATION_FIELDS.JOB_TITLE]?.message}
                />
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline" onClick={handleOnClear}>
                Clear
              </Button>
              <Button variant="solid" type="submit">
                Sign in
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      </Flex>
    );
  }
};

export default React.memo(Login);
