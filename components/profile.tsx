import { Button } from "@heroui/button";
import { auth, signIn, signOut } from "@/auth";
import { User } from "@heroui/user";
import SignOutButton from "@/components/signout";

export default async function SignIn() {
  const session = await auth();
  console.log(session);
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
