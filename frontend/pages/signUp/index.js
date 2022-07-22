import Layout from "../../layouts";
import Link from "next/link";
import GuestPageBorder from "../../components/guestPage/guestPageBorder";
import GuestPageTitle from "../../components/guestPage/guestPageTitle";
export default function SignUp() {
  return (
    <GuestPageBorder>
      <GuestPageTitle value="e-C4rteのユーザー登録にはグループが必要です" />
      <h2 className="text-xl my-4">
        グループの作成から始める場合は
        <Link href="/signUp/createGroup">
          <a className="border-b-2 border-blue-700 text-blue-700">こちら</a>
        </Link>
        から
      </h2>
      <h2 className="text-xl my-4">
        グループがすでにある方は
        <Link href="/signUp/createGroup">
          <a className="border-b-2 border-blue-700 text-blue-700">こちら</a>
        </Link>
        から
      </h2>
    </GuestPageBorder>
  );
}
