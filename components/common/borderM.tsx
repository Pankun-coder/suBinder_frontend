import { ReactNode } from "react";

export default function BorderM({ children }: { children: ReactNode }) {
  return (
    <section className="border-4 border-purple-400 w-auto mx-4 md:w-4/5 md:mx-auto my-8 p-4 text-center">
      {children}
    </section>
  );
}
