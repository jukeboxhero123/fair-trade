import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Account } from "./contexts/AccountContext";
import { Global } from "./contexts/GlobalContext";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_FAIR_TRADE_SERVICE_URL,
});

const wsLink = new GraphQLWsLink(createClient({
    url: process.env.REACT_APP_FAIR_TRADE_SERVICE_URL_WS,
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

const AppProviders = ({children}) => {

    return (
        <Router>
            <ApolloProvider client={client}>
                <Account>
                    <Global>
                        {children}
                    </Global>
                </Account>
            </ApolloProvider>
        </Router>
    );
};

export default AppProviders;
