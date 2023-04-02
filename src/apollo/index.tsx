import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type Characters } from './codegen/graphql';

export const apolloClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    characters: {
                        keyArgs: false, 
                        merge(existing: Characters, incoming: Characters) {
                            return {
                                ...incoming,
                                results:  [...(existing?.results || []), ...(incoming?.results || [])]
                            } satisfies Characters
                        }
                    }
                }
            }
        }
    }),
});


