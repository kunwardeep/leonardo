"use client";

import { Button, Card, Flex, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import { vestResolver } from "@hookform/resolvers/vest";
import { useUser } from "@/components/Context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  VALIDATION_FIELDS,
  validationSuite,
} from "@/utils/userDetailsValidation";
import React from "react";
import { BREAKPOINT } from "@/consts/breakpoints";
import { useBreakPoint } from "@/hooks/useBreakPoint";

const Login = () => {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();
  const currentBreakPoint = useBreakPoint();
  const [cardMinWidth, setCardMinWidth] = useState<"sm" | "lg">();

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

  useEffect(() => {
    if (!currentBreakPoint) return;

    switch (currentBreakPoint) {
      case BREAKPOINT.MOBILE:
      case BREAKPOINT.TABLET:
        setCardMinWidth("sm");
        break;
      case BREAKPOINT.DESKTOP:
        setCardMinWidth("lg");
    }
  }, [currentBreakPoint]);

  if (userLoading) {
    return;
  }

  const handleOnSubmit = (data: { [x: string]: string }) => {
    const username = data[VALIDATION_FIELDS.USERNAME];
    const jobTitle = data[VALIDATION_FIELDS.JOB_TITLE];
    if (username && jobTitle) {
      const saved = setUser({ username, jobTitle });
      if (saved) {
        router.push("/information");
      }
    }
  };

  const handleOnClear = () => {
    reset();
  };

  if (!userLoggedIn && cardMinWidth) {
    return (
      <Flex align="center" justify="center">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Card.Root size="lg" minW={cardMinWidth}>
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
