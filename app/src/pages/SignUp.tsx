import { Button, Group, Text, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import network from "../util/network";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";

type SignUpFormValues = {
  username: string;
  password: string;
  rePassword: string;
};

const signUpHandler = (newUser: Omit<SignUpFormValues, "rePassword">) => {
  return network.post("/auth/signup", newUser);
};

const SignUp = () => {
  const navigate = useNavigate();
  const form: UseFormReturnType<SignUpFormValues> = useForm<SignUpFormValues>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      rePassword: "",
    },

    validate: {
      password: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      rePassword: (value: string) =>
        value === form.getValues().password ? null : "Passwords must match",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUpHandler,
    onSuccess: (data) => {
      toast.success(data.data.message);
      toast("🪙 You won 10 credits!");
      navigate("/");
    },
    onError: (data: Error) => {
      if (data instanceof AxiosError) toast.error(data.response?.data.message);
      else toast.error(data.message);
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(({ username, password }) =>
        signUpMutation.mutate({ username, password }),
      )}
      className="p-5 flex flex-col gap-5 w-full md:w-1/2 lg:w-1/3 mx-auto"
    >
      <Text size="xl" fw={700} ta={"center"}>
        Sign Up
      </Text>
      <TextInput
        withAsterisk
        label="Username"
        placeholder="username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />
      <TextInput
        withAsterisk
        label="Password"
        placeholder="password"
        key={form.key("password")}
        {...form.getInputProps("password")}
        type="password"
      />
      <TextInput
        withAsterisk
        label="Re-enter password"
        placeholder="re-enter password"
        key={form.key("rePassword")}
        {...form.getInputProps("rePassword")}
        type="password"
      />

      {signUpMutation.isError && (
        <p className="text-red">
          ❌{" "}
          {signUpMutation.error instanceof AxiosError
            ? signUpMutation.error.response?.data.message
            : signUpMutation.error.message}
        </p>
      )}

      <Group justify="center" mt="md">
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Group>
      <p>
        Already have an account?{" "}
        <Link to="/signin" className="underline text-cyan-700">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
