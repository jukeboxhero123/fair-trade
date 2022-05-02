import { useLazyQuery } from '@apollo/client';
import React, { createContext, useEffect, useContext, useState } from 'react'
import { AccountContext } from './AccountContext';
import { GET_OPTIONS } from '../graphql/queries/getOptions';

const GlobalContext = createContext();

const useGlobal = () => {
    const { user } = useContext(AccountContext);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const isUserFetched = user ? true : false;

    const [getCategories] = useLazyQuery(GET_OPTIONS, {
        variables: {
            name: "Category"
        }
    });

    useEffect(() => {
        if (isUserFetched) {
            setIsLoading(true);
            getCategories()
                .then((res) => {
                    setCategories(res.data.getOptions.options);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log("ERROR GETTING CONSTANTS:", err);
                    setIsLoading(false);
                });
        }
    }, [isUserFetched, getCategories]);

    return {
        isLoading, categories
    }
}

const Global = (props) => {

    const global = useGlobal();

    return (
        <GlobalContext.Provider value={global}>
            {props.children}
        </GlobalContext.Provider>
    )
};

export { Global, GlobalContext };
