import { UserDTO } from "@/server/models/User/UserDTO";
import { useSession } from "next-auth/react";

export const useGetLoggedInUserClient = (): UserDTO | undefined => {
  const session = useSession();
  return session?.data?.user;
};
