import { UserDTO } from "futbol-in-core/types";
import { useSession } from "next-auth/react";

export const useGetLoggedInUserClient = (): UserDTO | undefined => {
  const session = useSession();
  return session?.data?.user;
};
