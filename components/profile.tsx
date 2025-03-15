import { Button } from "@heroui/button";
import { auth, signIn, signOut } from "@/auth";
import { User } from "@heroui/user";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  return user ? (
    <>
      <User
        avatarProps={{
          isBordered: true,
          className: "transition-transform",
          color: "secondary",
          src: user.image || undefined,
          size: "sm",
        }}
        description={user.email || "No email"}
        name={user.name || "No name"}
      />
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button color="primary" type="submit" variant="flat">
          Sign Out
        </Button>
      </form>
    </>
  ) : (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <Button color="primary" type="submit" variant="flat">
          Sign In
        </Button>
      </form>
    </>
  );
}
