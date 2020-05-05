import { ApolloClient, createHttpLink  } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    fetch
});

const authLink = setContext ((_, { headers }) => {

    //Leer el storage almacenado
    const token = localStorage.getItem('tokenCRM');

    return {
        headers: {
            ...headers, 
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.key || null
      }),
    link: authLink.concat( httpLink )
});

export default client;
