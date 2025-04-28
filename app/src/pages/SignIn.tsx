import { Button, Group, Text, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import network from "../util/network";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";

type SignInFormValues = {
  username: string;
  password: string;
};

const signInHandler = (user: SignInFormValues) => {
  return network.post("/auth/signin", user);
};

const SignIn = () => {
  const navigate = useNavigate();
  const form: UseFormReturnType<SignInFormValues> = useForm<SignInFormValues>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      password: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const signInMutation = useMutation({
    mutationFn: signInHandler,
    onSuccess: (data) => {
      toast.success(data.data.message);
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
        signInMutation.mutate({ username, password }),
      )}
      className="p-5 flex flex-col gap-5 w-full md:w-1/2 lg:w-1/3 mx-auto"
    >
      <Text size="xl" fw={700} ta={"center"}>
        Sign In
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

      {signInMutation.isError && (
        <p className="text-red">
          ❌{" "}
          {signInMutation.error instanceof AxiosError
            ? signInMutation.error.response?.data.message
            : signInMutation.error.message}
        </p>
      )}

      <Group justify="center" mt="md">
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Group>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="underline text-cyan-700">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
