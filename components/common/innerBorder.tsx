import { ReactNode } from "react";

export default function InnerBorder({ children }: { children: ReactNode }) {
  return <div className="border-2 border-black text-center w-full my-2 p-2">{children}</div>;
}
