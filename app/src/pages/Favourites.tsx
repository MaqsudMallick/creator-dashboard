import {
  Box,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Menu,
  Text,
} from "@mantine/core";
import network from "../util/network";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IconDotsVertical,
  IconCircleArrowUpRightFilled,
  IconShare,
  IconTrashFilled,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { FavouritePost } from "../util/types/post";

const removePost = (post: FavouritePost) => {
  return network.delete("/favourites/" + post.id);
};

const Favourites = () => {
  const { data: favourites, isLoading } = useQuery({
    queryKey: ["favourites"],
    queryFn: () => network.get("/favourites"),
  });
  const removePostMutation = useMutation({
    mutationFn: removePost,
    onSuccess: () => {
      toast.success("Post removed");
      toast("🪙 You won a credit!");
    },
    onError: (data: Error) => {
      if (data instanceof AxiosError) toast.error(data.response?.data.message);
      else toast.error(data.message);
    },
  });
  return (
    <>
      <Box pos="relative" className="md:w-[400px] lg:w-1/2 mx-auto">
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
                      leftSection={<IconTrashFilled size={14} />}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        removePostMutation.mutate(post);
                      }}
                    >
                      Remove
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

export default Favourites;
