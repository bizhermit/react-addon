import { NextPage } from "next";
import { FC } from "react";
import Link from "next/link";

const IndexPage: NextPage = () => {
  return <IndexComponent />;
};

export default IndexPage;

const IndexComponent: FC = () => {
  return (
    <>
      <h1>Welcom to App extends Next.js</h1>
      <Link href="/sandbox">Sandbox</Link>
    </>
  );
};
