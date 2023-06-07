import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "~/components/Layout";
import { CheckIcon } from "~/components/icons/Check";
import { CopyIcon } from "~/components/icons/Copy";

type Lyrics = {
  lyrics: string;
  id: string;
};

const Home: NextPage = () => {
  const [lyrics, setLyrics] = useState<Lyrics | null>(null);
  const [trackName, setTrackName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleTrackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackName(e.target.value);
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);
    if (trackName.trim() === "") {
      toast.error("Track name can't be empty!");
    } else {
      const res = await fetch(`/api/${trackName}/${artistName}`);
      if (res.ok) {
        const data = (await res.json()) as Lyrics;
        setLyrics(data);
      } else {
        if (res.status === 429) {
          toast.error("Rate limit exceeded!");
          return;
        } else {
          toast.error("Lyrics not found!");
        }
      }
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(lyrics?.lyrics || "")
      .then(() => {
        setCopied(true);
        sleep(1000)
          .then(() => setCopied(false))
          .catch(() => null);
      })
      .catch(() => {
        toast.error("Couldn't Copy!");
      });
  };

  useEffect(() => {
    const storedTrackName = localStorage.getItem("trackName");
    const storedArtistName = localStorage.getItem("artistName");
    if (storedTrackName && storedArtistName) {
      setTrackName(storedTrackName);
      setArtistName(storedArtistName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("trackName", trackName);
    localStorage.setItem("artistName", artistName);
  }, [trackName, artistName]);

  useEffect(() => {
    // Clear input fields on page reload
    const clearInputFields = () => {
      setTrackName("");
      setArtistName("");
    };
    window.addEventListener("beforeunload", clearInputFields);
    return () => {
      window.removeEventListener("beforeunload", clearInputFields);
    };
  }, []);

  return (
    <Layout>
      <section className="mt-4 flex w-full flex-col items-center justify-center gap-y-3 p-2 md:w-2/3 lg:w-1/2">
        <h2 className="bg-gradient-to-r from-amber-400 to-red-900 bg-clip-text text-[5rem] font-black text-transparent md:text-[7rem]">
          LyricQuest
        </h2>
        <p className="text-center font-beth text-base font-normal text-orange-200 md:text-xl">
          Explore the poetic words behind your beloved tunes
        </p>
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-6 p-2 md:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <input
            className="w-full rounded-md border border-zinc-600 bg-zinc-800/60 px-4 py-2 font-semibold text-orange-100 shadow-xl outline-0 placeholder:text-zinc-400 hover:outline-0"
            placeholder="Type in the song you're looking for 🎶"
            onChange={handleTrackChange}
          ></input>
          <div className="flex w-full items-center justify-start gap-4">
            <input
              className="w-full rounded-md border border-zinc-600 bg-zinc-800/60 px-4 py-2 font-semibold text-orange-100 shadow-xl outline-0 placeholder:text-zinc-400 hover:outline-0"
              placeholder="If known... Provide the artist's name 🧑‍🎤"
              onChange={handleArtistChange}
            ></input>
            <button
              className="rounded-md border border-zinc-600 bg-zinc-800/90 px-4 py-2 text-orange-100 shadow-xl duration-300 hover:bg-zinc-800/60"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleClick}
            >
              Explore
            </button>
          </div>
        </div>
        <div className="lyrics scrollbar-thumb-rounded-md relative h-[400px] max-h-[400px] w-full overflow-y-scroll rounded-md border border-zinc-600 bg-zinc-800/60 p-4 text-sm text-orange-100 shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/50 md:h-[250px] md:max-h-[250px]">
          <button
            onClick={handleCopy}
            className="duration:300 absolute right-[1rem] top-[1rem] z-[1000] rounded-md border border-zinc-600 bg-zinc-800/60 p-[0.35rem] text-base text-orange-100 shadow duration-300 hover:bg-zinc-700/40"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <p className="whitespace-pre-line text-base font-semibold">
            {lyrics?.lyrics
              ? lyrics.lyrics
              : isLoading
              ? "Searching ..."
              : "Nothing to see here... Yet 👀"}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
