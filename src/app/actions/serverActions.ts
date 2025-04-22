"use server";

import { PATHS, VALIDATION_FIELDS } from "@/consts";
import {
  createSession,
  deleteSession,
  getSession as getSessionServer,
} from "@/lib/session";
import { UserType } from "@/types";
import { validationSuite } from "@/utils/authValidations";
import { redirect } from "next/navigation";

export type FailureMessages = Record<string, string[]> | undefined;

export type LoginActionState = {
  success: boolean;
  errors: FailureMessages;
};

const login = async (
  previousState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  const data = {
    username: formData.get(VALIDATION_FIELDS.USERNAME),
    jobTitle: formData.get(VALIDATION_FIELDS.JOB_TITLE),
  };

  const result = validationSuite(data);

  if (result.hasErrors()) {
    return {
      success: false,
      errors: result.getErrors(),
    };
  }

  if (data.username && data.jobTitle) {
    await createSession(data.username.toString(), data.jobTitle.toString());
  }

  redirect(PATHS.HOME);
};

export const logout = async () => {
  await deleteSession();
};

export const getSession = async () => {
  return await getSessionServer();
};

export const updateUser = async (user: UserType) => {
  return await createSession(user.username, user.jobTitle);
};

export default login;
