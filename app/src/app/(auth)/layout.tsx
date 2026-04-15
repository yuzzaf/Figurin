import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default async function UserLayout(props: IProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) redirect("/login");

  return <div>{props.children}</div>;
}
