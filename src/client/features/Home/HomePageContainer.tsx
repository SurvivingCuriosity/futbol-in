import { UserDTO } from "futbol-in-core/types";
import { signOut } from "next-auth/react";
import HomePage from "./HomePage";

export const revalidate = 60 * 3;

const HomePageContainer = async ({ user }: { user: UserDTO | undefined }) => {
  if (!user) {
    signOut();
  }

  return <HomePage user={user} />;
};

export default HomePageContainer;
