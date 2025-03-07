import { useSession } from "next-auth/react";
import { UserDTO } from "../models/User/UserDTO";

export const useGetLoggedInUserClient = (): UserDTO | undefined => {
  const session = useSession();
  return session?.data?.user;
};
