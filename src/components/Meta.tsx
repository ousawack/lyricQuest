import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <title>LyricQuest</title>
      <link rel="icon" href="https://fmj.asrvd.me/🎶"></link>
      <meta
        name="description"
        content="Discover the Lyrics to Your Favorite Songs!"
      />
      <meta name="theme-color" content="#fce7f3" />
      <meta property="og:site_name" content="LyricQuest" />
      <meta property="og:title" content="LyricQuest" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="simple yet powerful RESTful lyrics API"
      />
    </Head>
  );
}
