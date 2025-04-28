import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  Menu,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import network from "../util/network";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IconDotsVertical,
  IconCircleArrowUpRightFilled,
  IconShare,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import { FavouritePost } from "../util/types/post";
import { useParams } from "react-router";
import { useForm, UseFormReturnType } from "@mantine/form";
import { AxiosError } from "axios";

const User = () => {
  const id = useParams().id;
  if (!id) return <div>User id is required</div>;
  const { data: favourites, isLoading } = useQuery({
    queryKey: [`favouritesFor${id}`],
    queryFn: () => network.get("/admin/favourites/" + id),
  });
  useQuery({
    queryKey: [`userFor${id}`],
    queryFn: async () => {
      const user = await network.get("/admin/user/" + id);
      form.setValues({ credits: user.data.data.credits });
      return user;
    },
  });
  const updateCreditsMutation = useMutation({
    mutationFn: (updatedCredits: { userId: string; credits: number }) =>
      network.put("/admin/update-credits", updatedCredits),
    onSuccess: () => {
      toast.success("Updated credits");
    },
    onError: (data: Error) => {
      if (data instanceof AxiosError) toast.error(data.response?.data.message);
      else toast.error(data.message);
    },
  });
  const form: UseFormReturnType<{ credits: number }> = useForm<{
    credits: number;
  }>({
    mode: "uncontrolled",
    initialValues: {
      credits: 0,
    },

    validate: {
      credits: (value: number) =>
        Number(value) >= 0 ? null : "Credits must be a positive number",
    },
  });
  return (
    <>
      <Box pos="relative" className="md:w-[400px] lg:w-1/2 mx-auto">
        <form
          onSubmit={form.onSubmit(({ credits }) =>
            updateCreditsMutation.mutate({
              userId: id!,
              credits: Number(credits),
            }),
          )}
          className="p-5 flex flex-col gap-5 w-full"
        >
          <Text size="xl" fw={700} ta={"center"}>
            Update Credits
          </Text>
          <Divider my="md" />

          {updateCreditsMutation.isError && (
            <p className="text-red">
              ❌{" "}
              {updateCreditsMutation.error instanceof AxiosError
                ? updateCreditsMutation.error.response?.data.message
                : updateCreditsMutation.error.message}
            </p>
          )}

          <Group justify="center" mb="lg">
            <TextInput
              withAsterisk
              label="Credits"
              placeholder="credits"
              key={form.key("credits")}
              {...form.getInputProps("credits")}
            />
            <Stack justify="center" mt="lg">
              <Button type="submit">Submit</Button>
            </Stack>
          </Group>
          <Divider my="md" />
        </form>
        <Text size="xl" fw={700} ta={"center"} mb="xl">
          User Favourites
        </Text>
        <Divider my="md" />
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {favourites?.data.data &&
          favourites.data.data.map((post: FavouritePost) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="cursor-pointer"
              onClick={() => window.open(post.post_link, "_blank")}
              key={post.id}
            >
              <Card.Section>
                <Image src={post.image_link} height={160} alt="" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} w="80%">
                  {post.title}
                </Text>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Box
                      onClick={(event: React.MouseEvent) =>
                        event.stopPropagation()
                      }
                      className="hover:bg-gray-800 rounded-full p-2 cursor-pointer"
                    >
                      <IconDotsVertical size={14} />
                    </Box>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Actions</Menu.Label>
                    <Menu.Item
                      leftSection={<IconCircleArrowUpRightFilled size={14} />}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        window.open(post.post_link, "_blank");
                      }}
                    >
                      Open
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconShare size={14} />}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        navigator.clipboard.writeText(post.post_link);
                        toast.info("Copied to clipboard");
                      }}
                    >
                      Share
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default User;
