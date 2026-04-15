import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default async function UserLayout(props: IProps) {
  return <>{props.children}</>;
}
