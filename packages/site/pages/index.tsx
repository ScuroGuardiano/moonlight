import Head from "next/head";
import LinkButton, { LinkButtonSize } from "../components/communism/link-button";
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Moonlight - Home page</title>
      </Head>
      
      <h1>Witaj towarzyszu</h1>
      <p>Co dziś piracimy? Statek już czeka.</p>
      <LinkButton bordered size={LinkButtonSize.MIGHTY} href="https://github.com/ScuroGuardiano">Odcumuj piracki okręt</LinkButton>
      <h3><em>It's a wonderful system, kinda like communism except it actually works and nobody starves.</em></h3>
      <small>~ Mental Outlaw about sharing Netflix account</small>
    </Layout>
  );
}
