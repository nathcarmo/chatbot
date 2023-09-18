import { ReactNode } from "react";
interface Props {
    children?: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
      <>
          <main className="flex min-h-screen w-full">
            {children}
          </main>
      </>
    )
  }