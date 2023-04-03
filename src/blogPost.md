# How to Write a GraphQL Query

## A beginner’s guide to writing your first GraphQL query

// #react #typescript #graphql #apollographql

Today, we will explore the basics of [GraphQL](https://graphql.org/) and learn how to structure queries and retrieve data from a GraphQL API. While no prior experience with GraphQL is required, having some familiarity with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) will be helpful in understanding the concepts we'll cover. Whether you're a seasoned developer or a newbie like me, this guide will provide a comprehensive introduction to help you get started with writing GraphQL queries using Apollo Client.

I'll be sharing my tips and tricks along the way, and I hope that this article will be a valuable resource for anyone looking to learn about GraphQL.

## **Do you know what GraphQL is?**

In short, **GraphQL is an open-source query language** that was developed with the aim of facilitating communication between client and server in web applications. It was created by Facebook in 2012 and quickly gained popularity among developers due to its innovative and efficient approach to **fetching** and manipulating data.

The great thing about GraphQL is that it allows for faster and more scalable web applications, with cool features such as intelligent caching, strong typing, **querying for specific fields**, multiple operations in a single request, and much more. As a result, we end up simplifying the code, making it easier to understand and maintain. And the best part? **We save time**, because we don't have to write as much logic for fetching and manipulating data from scratch.

## **Understanding GraphQL queries**

Basically, a GraphQL query allows clients to retrieve **only the data they need**, and nothing more from a GraphQL API.

To write a GraphQL query, you need to specify the data you want to retrieve and the structure in which you want it to be returned. This is done using a query language that is similar to JSON, where you can specify which fields you want to retrieve, and any filters or sorting you need to use. Then, the GraphQL server uses that query to grab the data you requested and sends it back to you in a nice, tidy JSON format.

In this article we will utilize [the Rick and Morty API GraphQL playground](https://rickandmortyapi.com/graphql). There, you can experiment with writing your own queries and seeing the data that comes back. **It's a great way to get a feel for how GraphQL works**, and to see the benefits of being able to request exactly the data you need. So go ahead and give it a try – you might just have some fun while you're at it!

About how to use it, let's say we want to retrieve the name, gender, and status of all the characters from the [Rick and Morty API](https://rickandmortyapi.com/). We can write the following query:

```graphql
query {
  characters {
    results {
      name
      gender
      status
    }
  }
}
```

In this query, we are using the **query** keyword to indicate that we want to retrieve data from the API. We then specify the name of the endpoint we want to query, in this case, characters. Finally, we specify the fields we want to retrieve, which are name, gender, and status.

The response from a GraphQL query is also structured in a JSON-like format. Here is an example of what the response for our query might look like:

````json
{
  "data": {
    "characters": {
      "results": [
        {
          "name": "Rick Sanchez",
          "gender": "Male",
          "status": "Alive"
        },
        {
          "name": "Morty Smith",
          "gender": "Male",
          "status": "Alive"
        },
        ...
      ]
    }
  }
}
````

In this response, the data is returned in the **same structure as our query**. The data field contains the results of our query, which includes the characters field and the results subfield that contains an array of character objects, each with the name, gender, and status fields that we requested.

## **It's time to roll up your sleeves and get to work: Let's fetch a GraphQL query using Apollo Client**

First thing to know is that [Apollo Client](https://www.apollographql.com/docs/react/) is a powerful [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) library that helps you work with GraphQL APIs. **It's not necessary** to use Apollo Client to write a GraphQL query, but it can make your life a lot easier if you do.

One of the main benefits of using Apollo Client is that it abstracts away a lot of the low-level details of working with GraphQL APIs. It handles things like caching, network requests, and error handling, so you can focus on writing your application code instead of worrying about these details.

### **Step by setp to start a project**

1. First, you need to create a React project with Typescript. I recommend using the [T3 App](https://create.t3.gg/)  template, which has excellent documentation and is simple to use. Simply run the following command:

    ```sql
    npm create t3-app@latest
    ```

2. After creating the project, install Apollo Client by running the following command:

   ```sql
   yarn add @apollo/client graphql
   ```

3. With the basic tools installed, organize the project architecture by following the steps below:
   1. Create a folder named `apollo` inside the `src` folder of your project.
   2. Create a file named `index.tsx` inside the `apollo` folder
   3. Create a second folder named `codegen` inside the `apollo` folder. - We will see more about [codegen](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config) later!

    The project architecture should look similar to this:

    ````css
    src
    └── apollo
    |   └── codegen
    |   └── index.tsx
    └── ...
    ````

4. With the environment configured, it's finally time for some fun: Let's initialize our [Apollo Client](https://www.apollographql.com/docs/react/get-started) inside the `index.tsx` file:
    1. To start, lets import only the symbols we need from `@apollo/client`

        ````TypeScript
        import { ApolloClient, InMemoryCache } from "@apollo/client";
        ````

    2. After that, we'll start our Apollo Client by configuring the `uri` and `cache` objects, passing only the data we'll be using. In this case, we'll use The Rick and Morty API, and for now, to not worry about the `cache`, we'll use only `InMemoryCache`.

        ````TypeScript
        export const apolloClient = new ApolloClient({
          uri: "https://rickandmortyapi.com/graphql",
          cache: new InMemoryCache();
        ````

      - `uri` indicates the `URL` of our GraphQL server.
      - `cache` is an instance of `InMemoryCache`, which stores query results retrieved by Apollo Client.

5. To be able to use Apollo in our React application, we need to wrap it in the Apollo Client as shown in the example below from the `_app.tsx` file:

      ````TypeScript
      import { type AppType } from "next/dist/shared/lib/utils";
      import "@/styles/globals.css";
      import { ApolloProvider } from "@apollo/client";
      import { apolloClient } from "@/apollo";
      import Head from "next/head";

      const MyApp: AppType = ({ Component, pageProps }) => {
        return (
          <ApolloProvider client={apolloClient}>
            <Head>
              <title>GraphQL and Morty</title>
            </Head>
            <Component {...pageProps} />;
          </ApolloProvider>
        );
      };

      export default MyApp;
        ````

6. This step is optional, but strongly recommended for TypeScript users. Anyway we will use the [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config) to simplify the generation of API typings.

   - GraphQL Code Generator is a powerful tool that automates the process of generating type-safe code from your GraphQL schema. With just a few lines of configuration, you can generate code for your client-side application in a variety of languages, including TypeScript, JavaScript, Java, and more.

      1. First, to install the required packages you need run the following command:

            ````sql
            yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
            ````

           This will install the necessary dependencies for generating TypeScript code from your GraphQL schema.

      2. Second, to initiate the configuration by running the command:

            ````csharp
            Yarn graphql-codegen init
            ````

            This will create a configuration file for you to customize and set up according to your needs.
      3. Next, run the following command

            ````csharp
            yarn graphql-code-generator init
            ````

      4. At Last, generate the code by running the command:  

            ````csharp
            yarn codegen
            ````

            This will generate type-safe code for your client-side application based on the schema defined in your GraphQL API.

    With these simple steps, you can automate the process of generating type-safe code from your GraphQL schema and enjoy the benefits of increased productivity and reduced potential for errors in your client-side application.

### **Now we can write our first GraphQL query**

 To query data from the Rick and Morty API, we can use a [React Hook](https://reactjs.org/docs/hooks-intro.html) known as **`useQuery`** from Apollo Client. This function takes a GraphQL query defined using the `gql` tagged template literal as its argument.
 
 You can get a better understanding by checking out the example below:

````TypeScript
const result = useQuery<{ characters: Characters }>(
  gql`
    query Characters {
      characters {
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
  `
);
````

- Note that if you're using the [Visual Studio Code](https://code.visualstudio.com/), I recommend downloading the [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) extension to make your query more readable.

The following example aims to fetch character information and display it in an infinite scroll list. To implement this, the `$page` parameter of type `Int` must be added to the GraphQL query and defined in the variables object passed as the second argument to the `useQuery` function

````TypeScript
const result = useQuery<{ characters: Characters }>(
    gql`
      query Characters($page: Int) {
        characters(page: $page) {
          info {
            count
            next
          }
          results {
          ...
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
````

The code above demonstrates that when the query is executed for the first time, the value of `$page` is set to `1` in order to retrieve the first page of results.

Successive, to create the infinite scroll logic,  we'll create a state called `isFetchingMore` that is used to control whether the application is fetching more data or not.

 ````TypeScript
 const [isFetchingMore, setFetchingMore] = useState(false);
 ````

Later, a `callback` function called `fetchNextPage` is defined to fetch the next page of data. The `callback` function is defined using the `useCallback` function from React to ensure that the function is **only created once** and reused in subsequent renders.

  ````TypeScript
  const fetchNextPage = useCallback(async () => {
    if (loading || isFetchingMore || !data?.characters.info?.next || !inView)
      return;
    setFetchingMore(true);
    await fetchMore({
      variables: { page: data.characters.info.next },
    });
    setFetchingMore(false);
  }, [data, fetchMore, inView, isFetchingMore, loading]);
 ````

Within the `callback`, a check is made to prevent the function from being executed in unwanted situations. First, it is checked whether the `loading` state of the current query is true, indicating that the application is already fetching more data. If it is true, the function is aborted.

Next, it is checked if the `isFetchingMore` state is true. If it is true, the function is also interrupted, indicating that the application is already fetching more data.

Then, it is checked if the next page of data exists `data?.characters.info?.next` and if the element is visible on the screen `inView`. If either of these conditions is not met, the function is also interrupted.

If all the above conditions are met, the state of `isFetchingMore` is set to true, indicating that the application is fetching more data.

Subsequent, the `fetchMore` function is executed with the variables parameter set as `{page: data.characters.info.next}`, retrieving the next page of data. The await keyword is used to ensure that the function waits for the response of the query before proceeding.

Finally, the state of `isFetchingMore` is set back to false, indicating that the search has been completed. This logic allows the application to search for new data only after the previous search has been completed.

To implment the infinite scroll effect, was used the [Intersection Observer (IO) API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect when an element, defined as a reference, enters the screen. When the element is visible, the `fetchNextPage` function is called to fetch the next page of data and add it to the list.

```TypeScript
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (inView) fetchNextPage();
    }, 100);
    return () => clearTimeout(timeOut);
  }, [inView, fetchNextPage]);
```

 If you're interested in learning more details, you can check out the full code in the [repository](https://github.com/dellamora/my-first-GraphQL-query).

After that, when the user scrolls down to the end of the character list, a new query is executed to fetch the next page of results. The page number is determined by the `next` property in the `info` object returned by the previous query. If `next` is `null`, it means there are no more pages to `fetch`.

### **We're almost there! Let's work on the final piece of the code.**

To complete our project, we need to **go back to our Apollo Client** and customize our cache.

Within the cache configuration, it's possible to define type policies for each type of data that will be stored. You can check by the following example:

````TypeScript
export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,
            merge(existing: Characters, incoming: Characters) {
              return {
                ...incoming,
                results: [
                  ...(existing?.results || []),
                  ...(incoming?.results || []),
                ],
              } satisfies Characters;
            },
          },
        },
      },
    },
  }),
});
````

In this example, the type policy is being defined for the `Query` type and the `characters` field. Inside the `characters` field, the `keyArgs` property is being set to `false`, which means there will be no argument keys.

The `merge` property is responsible for merging the data received from the API with the existing data in the cache. This property defines a function that takes two arguments, `existing` and `incoming`, representing the existing data and new data, respectively. The function uses the spread operator to merge the arrays of results from the existing and new data, ensuring that no data is duplicated.

It's worth noting that the satisfies Characters is a type check that ensures the function's return value conforms to the Characters type.

 Finally, you can style and use any tools you want to develop your application!
 Feel free to get inspired by [my project](https://github.com/dellamora/my-first-GraphQL-query), use your creativy and have fun!
