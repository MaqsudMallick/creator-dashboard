import { useQuery } from "@tanstack/react-query";
import network from "../util/network";
import {
  Box,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { User } from "../util/types/users";
import Badge from "../components/Badge";
import { useNavigate } from "react-router";

const Users = () => {
  const navigate = useNavigate();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => network.get("/admin/users"),
  });
  return (
    <Box pos={"relative"} className="md:w-[400px] lg:w-1/2 mx-auto">
      <Text size="xl" fw={700} ta={"center"} mb="xl">
        Users
      </Text>
      <Divider my="md" />
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {users?.data.data && (
        <Stack gap={10} p={10}>
          {users.data.data.map((user: User) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="cursor-pointer"
              onClick={() => navigate(`/admin/user/${user.id}`)}
              key={user.id}
            >
              <Group justify="space-between" mt="md" mb="xs">
                <p>{user.username}</p>
                <p>{user.role}</p>
                <Badge>{user.credits} 🪙</Badge>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Users;
