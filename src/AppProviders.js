import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Account } from "./contexts/AccountContext";
import { Global } from "./contexts/GlobalContext";

const client = new ApolloClient({
    uri: process.env.REACT_APP_FAIR_TRADE_SERVICE_URL,
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
