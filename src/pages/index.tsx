import { gql, useQuery } from "@apollo/client";
import { type Characters } from "@/apollo/codegen/graphql";
import { type NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import ChevronTop from "@/common/svgs/chevronTop";
import { useScroll } from "framer-motion";

const Home: NextPage = () => {
  const [isFetchingMore, setFetchingMore] = useState(false);
  const { ref, inView } = useInView({});
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  const { data, fetchMore, loading } = useQuery<{ characters: Characters }>(
    gql`
      query Characters($page: Int) {
        characters(page: $page) {
          info {
            count
            next
          }
          results {
            created
            gender
            id
            image
            name
            species
            status
            type
          }
        }
      }
    `,
    {
      variables: {
        page: 1,
      },
    },
  );

  const fetchNextPage = useCallback(async () => {
    if (loading || isFetchingMore || !data?.characters.info?.next || !inView)
      return;
    setFetchingMore(true);
    await fetchMore({
      variables: { page: data.characters.info.next },
    });
    setFetchingMore(false);
  }, [data, fetchMore, inView, isFetchingMore, loading]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (inView) fetchNextPage();
    }, 100);
    return () => clearTimeout(timeOut);
  }, [inView, fetchNextPage]);

  useEffect(() => {
    scrollYProgress.on("change", latest => {
      setProgress(latest);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {progress > 0.2 ? (
          <a href="#top">
            <ChevronTop className="fixed bottom-10 right-20 z-40 animate-bounce " />
          </a>
        ) : null}
        <div className="grid w-full grid-cols-charactersCards place-items-center gap-8 px-16 py-4">
          {data?.characters.results?.map(character => {
            return (
              <div
                key={`character-${character?.id}`}
                className=" w-fit overflow-hidden rounded-md border border-secondaryDark bg-secondaryDark shadow-md md:w-full"
              >
                <div className="relative aspect-video w-80 overflow-hidden md:w-full">
                  <Image
                    alt="character"
                    src={character?.image || " "}
                    fill
                    className=" object-cover"
                  />
                </div>
                <div className="p-4 text-left">
                  <h1 className="font-bold">{character?.name}</h1>
                  <h1>{character?.species}</h1>
                </div>
              </div>
            );
          })}
          {!loading && !isFetchingMore && data?.characters.info?.next ? (
            <div ref={ref} className="-mt-60 flex h-10 justify-center" />
          ) : null}
        </div>
      </main>
    </>
  );
};

export default Home;
