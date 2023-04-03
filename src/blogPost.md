

To write a GraphQL query, you need to specify the data you want to retrieve and the structure in which you want it to be returned. This is done using a query language that is similar to JSON.

## step by step 

- foi iniciar um projeto react usando o T3 lá 
- ai eu configurei o Apollo
- Ai eu configurei o codegen pq ne to usando typescript 
- fiz a query dos personagens
- ai eu configurei a cache para poder paginação 
- ai eu baixei o IO API 
- ai eu juntei o IO API pra fazer o infinito la 
- ai estilizei os cards 
- adicionei setinha pro topo 
- arrumei layout 
- refatorei código

Name: Apollo GraphQL
Id: apollographql.vscode-apollo
Description: Rich editor support for GraphQL client and server development that seamlessly integrates with the Apollo platform
Version: 1.19.11
Publisher: Apollo GraphQL
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo

---
# How to Write a GraphQL Query

## A beginner’s guide to writing your first GraphQL query

#react #typescript #graphql #apollographql

Today,  we will explore the basics of GraphQL and learn how to structure queries and retrieve data from a GraphQL API. While no prior experience with GraphQL is required, having some familiarity with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/) will be helpful in understanding the concepts we'll cover. Whether you're a seasoned developer or a newbie like me, this guide will provide a comprehensive introduction to help you get started with writing GraphQL queries using ApolloClient

 I'll be sharing my tips and tricks along the way, and I hope that this article will be a valuable resource for anyone looking to learn about GraphQL.

## **Do you know what GraphQL is?**

In short, **GraphQL is an open-source query language** that was developed with the aim of facilitating communication between client and server in web applications. It was created by Facebook in 2012 and quickly gained popularity among developers due to its innovative and efficient approach to **fetching** and manipulating data.

The great thing about GraphQL is that it allows for faster and more scalable web applications, with cool features such as intelligent caching, strong typing, **querying for specific fields**, multiple operations in a single request, and much more. As a result, we end up simplifying the code, making it easier to understand and maintain. And **the best part?** We save time, because we don't have to write as much logic for fetching and manipulating data from scratch.

## **Understanding GraphQL queries**

Basically, a GraphQL query allows clients to retrieve only the data they need, and nothing more from a GraphQL API.

You write queries using the GraphQL query language, which is kind of like a simple way of asking for what you want. You can specify which fields you want to retrieve, and any filters or sorting you need to use. Then, the GraphQL server uses that query to grab the data you requested and sends it back to you in a nice, tidy JSON format.

In this article we will utilize [the Rick and Morty API GraphQL playground](https://rickandmortyapi.com/graphql). There, you can experiment with writing your own queries and seeing the data that comes back. It's a great way to get a feel for how GraphQL works, and to see the benefits of being able to request exactly the data you need. So go ahead and give it a try – you might just have some fun while you're at it.

About how to use it, let's say we want to retrieve the name, gender, and status of all the characters from the Rick and Morty API. We can write the following query:

````graphql
query {
  characters {
    results {
      name
      gender
      status
    }
  }
}
````

In this query, we are using the query keyword to indicate that we want to retrieve data from the API. We then specify the name of the endpoint we want to query, in this case, characters. Finally, we specify the fields we want to retrieve, which are name, gender, and status.

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
In this response, the data is returned in the same structure as our query. The data field contains the results of our query, which includes the characters field and the results subfield that contains an array of character objects, each with the name, gender, and status fields that we requested. 


## **It's time to roll up your sleeves and get to work: Let's fetch a GraphQL query using ApolloClient**

First thing to know is that [ApolloClient](https://www.apollographql.com/docs/react/) is a powerful [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) library that helps you work with GraphQL APIs. It's not necessary to use ApolloClient to write a GraphQL query, but it can make your life a lot easier if you do.

One of the main benefits of using ApolloClient is that it abstracts away a lot of the low-level details of working with GraphQL APIs. It handles things like caching, network requests, and error handling, so you can focus on writing your application code instead of worrying about these details.

 
### **Step by setp to start the project**

//colocar todos os nomes de arquivos e pastas entre `` 

1. First, you need to create a React project with Typescript. I recommend using the [T3 App](https://create.t3.gg/)  template, which has excellent documentation and is simple to use. Simply run the command `npm create t3-app@latest` in the terminal.
2. After creating the project, install ApolloClient by running the command `yarn add @apollo/client graphql` in the terminal.
3. With the basic tools installed, organize the project architecture by following the steps below:
   1. Create a folder named `Apollo` inside the `src` folder of your project.
   2. Create a file named `index.tsx` inside the `Apollo` folder
   3. Create a second folder named `codegen` inside the `Apollo` folder. - We will see more about codegen later!
   
The project architecture should look similar to this:

````
src 
  apollo
    >codegen
    index.tsx
    ...
````
4. With the environment configured, it's finally time for some fun: Let's initialize our [ApolloClient](https://www.apollographql.com/docs/react/get-started) inside the `index.tsx` file:
````TypeScript
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache();
````


   2. app.tsx
 ````TypeScript
import { type AppType } from "next/dist/shared/lib/utils";
import "n/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "n/apollo";
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
5. Let's write the API query as it is in the playground example
   1. If you're using the [Visual Studio Code](https://code.visualstudio.com/), I recommend downloading the [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) extension to make your query more readable.
6. After that, we'll use codegen to generate the API typings for us.
7. Now, let's configure the cache to enable pagination in the index.
8. Finally, you can style and use any tools you want to develop your application, and I recommend using Framer Motion for animations like the nav toggle and Intersection Observer to create the infinite scroll effect. Feel free to use your creativy and have fun!



