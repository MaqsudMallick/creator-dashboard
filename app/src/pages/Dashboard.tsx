import {
  Box,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Menu,
  Select,
  Text,
} from "@mantine/core";
import network from "../util/network";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IconDotsVertical,
  IconCircleArrowUpRightFilled,
  IconHeartFilled,
  IconShare,
  IconMessageReportFilled,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";
import { Post } from "../util/types/post";

const savePost = (post: Post) => {
  return network.post("/favourites", post);
};

const Dashboard = () => {
  const [platform, setPlatform] = useState<string | null>("Reddit");
  const { data: feed, isLoading } = useQuery({
    queryKey: ["feed", platform],
    queryFn: async () => {
      const response = await network.get(
        `/feed?source=${platform?.toLowerCase()}`,
      );
      return response;
    },
  });
  const savePostMutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      toast.success("Post saved");
    },
    onError: (data: Error) => {
      if (data instanceof AxiosError) toast.error(data.response?.data.message);
      else toast.error(data.message);
    },
  });
  console.log(isLoading);
  return (
    <>
      <Box pos="relative" className="md:w-[400px] lg:w-1/2 mx-auto">
        <Group flex={1} justify="flex-end" align="center" m={10}>
          <Box>
            <Select
              label="Platform"
              placeholder="Pick value"
              data={["Reddit", "Linkedin"]}
              defaultValue="Linkedin"
              onChange={(value) => setPlatform(value)}
            />
          </Box>
        </Group>

        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {feed?.data.data &&
          feed.data.data.map((post: Post) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="cursor-pointer"
              onClick={() => window.open(post.link, "_blank")}
              key={post.id}
            >
              <Card.Section>
                <Image src={post.image} height={160} alt="" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{post.title}</Text>
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
                        window.open(post.link, "_blank");
                      }}
                    >
                      Open
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconHeartFilled size={14} />}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        savePostMutation.mutate(post);
                      }}
                    >
                      Save
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconShare size={14} />}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        navigator.clipboard.writeText(post.link);
                        toast.info("Copied to clipboard");
                      }}
                    >
                      Share
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconMessageReportFilled size={14} />}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        toast.success("Post Reported!");
                      }}
                    >
                      Report
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Text size="sm" c="dimmed">
                {post.description}
              </Text>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Dashboard;
