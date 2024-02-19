import { IUser } from "@/interfaces/IUser";
import axios from "axios";
import { getSession } from "next-auth/react";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user: IUser = await axios
      .get(`${process.env.NEXT_PUBLIC_API}/users`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log("GET_CURRENT_USER_ERROR", error);
  }
};

export default getCurrentUser;
