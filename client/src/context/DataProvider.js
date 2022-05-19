import { createContext, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const USERS_URL = "/users"
const TRANSACTION_URL = "/transactions"
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState({});
    const [transactions, setTransactions] = useState([{}])

   

// gets all users
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await axiosPrivate.get(USERS_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setData(response.data); 
            } catch (err) {
                console.error(err);
            }
        }

        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    
//gets all transactions
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTransactions = async () => {
            try {
                const response = await axiosPrivate.get(TRANSACTION_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTransactions(response.data); 
            } catch (err) {
                console.error(err);
            }
        }

        getTransactions();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (
    
    <DataContext.Provider value={{ data, setData, transactions, setTransactions }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;