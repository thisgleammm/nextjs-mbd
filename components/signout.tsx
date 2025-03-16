import { Button } from "@heroui/button";
import { auth, signIn, signOut } from "@/auth";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  return user ? (
    <>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button className="ml-4" color="primary" type="submit" variant="flat">
          Sign Out
        </Button>
      </form>
    </>
  ) : null;
}
