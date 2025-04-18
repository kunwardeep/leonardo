"use client";

import { Button, Card, Flex, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "@/components/Ui/InputField";
import { vestResolver } from "@hookform/resolvers/vest";
import { useActionState, useRef } from "react";
import { validationSuite } from "@/utils/authValidations";
import React from "react";
import { VALIDATION_FIELDS } from "@/consts";
import login, { LoginActionState } from "@/app/actions/serverActions";

const Login = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      success: false,
      errors: {},
    }
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: vestResolver(validationSuite),
    defaultValues: {
      [VALIDATION_FIELDS.USERNAME]: "",
      [VALIDATION_FIELDS.JOB_TITLE]: "",
    },
    mode: "onBlur",
  });

  const handleOnSubmit = () => {
    // Submit using the native form API so action={formAction} gets triggered
    formRef.current?.submit();
  };

  return (
    <Flex align="center" justify="center">
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Card.Root size="lg" minW={{ base: "sm", md: "lg" }}>
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
                error={
                  errors[VALIDATION_FIELDS.USERNAME]?.message ||
                  state.errors?.username?.toString()
                }
              />
              <InputField
                registration={register(VALIDATION_FIELDS.JOB_TITLE)}
                label={"Job Title"}
                placeholder={"Enter your job title"}
                error={
                  errors[VALIDATION_FIELDS.JOB_TITLE]?.message ||
                  state.errors?.jobTitle?.toString()
                }
              />
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" onClick={() => reset()}>
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
};

export default React.memo(Login);
