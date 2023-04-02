import { gql, useQuery } from "@apollo/client";
import { type Characters } from "n/apollo/codegen/graphql";
import { type NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [isFetchingMore, setFetchingMore] = useState(false)
  const result = useQuery<{characters: Characters }>(gql`query Characters($page: Int) {
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
  }`, {
    variables: {
      page: 1
    }
  })
  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <button onClick={async () => {
            if (result.loading || isFetchingMore || !result.data?.characters.info?.next) return 
            setFetchingMore(true)
             await result.fetchMore({
              variables: {
                page: result.data.characters.info.next
              }
            })
            setFetchingMore(false)
          }}>
            fetch more
          </button>
          <span> {JSON.stringify(result.data?.characters.results)}</span>
        </div>
      </main>
    </>
  );
};

export default Home;
