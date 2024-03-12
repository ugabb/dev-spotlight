import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    console.log(session);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log("GET_CURRENT_USER_ERROR", error);
    return null
  }
};

export default getCurrentUser;
