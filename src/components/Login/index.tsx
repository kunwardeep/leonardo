"use client";

import { CLIENT_VALIDATION_MESSAGES } from "@/consts/clientValidationMessages";
import { Button, Card, Flex, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { create, enforce, test } from "vest";
import { vestResolver } from "@hookform/resolvers/vest";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

const validationSuite = create((data = {}) => {
  test("username", CLIENT_VALIDATION_MESSAGES.USER_NAME.IS_EMPTY, () => {
    enforce(data.username.trim()).isNotEmpty();
  });

  test("username", CLIENT_VALIDATION_MESSAGES.USER_NAME.TOO_SHORT, () => {
    enforce(data.username.trim()).longerThan(2);
  });

  test("jobTitle", CLIENT_VALIDATION_MESSAGES.JOB_TITLE.IS_EMPTY, () => {
    enforce(data.jobTitle.trim()).isNotEmpty();
  });

  test("jobTitle", CLIENT_VALIDATION_MESSAGES.JOB_TITLE.TOO_SHORT, () => {
    enforce(data.jobTitle.trim()).longerThanOrEquals(3);
  });
});

const Login = () => {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: vestResolver(validationSuite),
    defaultValues: {
      username: "",
      jobTitle: "",
    },
    mode: "onBlur",
  });

  if (userLoading) {
    return;
  }

  if (!userLoading && user) {
    // User Logged in. Push them to the information page
    router.push("/information");
    return;
  }

  const handleOnSubmit = (data: { [x: string]: string }) => {
    const username = data["username"];
    const jobTitle = data["jobTitle"];
    if (username && jobTitle) {
      const saved = setUser({
        username: jobTitle,
        jobTitle: jobTitle,
      });
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

  return (
    <Flex align="center" justify="center" className="bg-gray-100 h-dvh w-dvw">
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
                registration={register("username")}
                label={"Username"}
                placeholder={"Enter your username"}
                error={errors["username"]?.message}
              />
              <InputField
                registration={register("jobTitle")}
                label={"Job Title"}
                placeholder={"Enter your job title"}
                error={errors["jobTitle"]?.message}
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
};

export default Login;
