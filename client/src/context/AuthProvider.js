import { createContext, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const USERS_URL = "/users";
const AUTH_URL = "/:user";
const TRANSACTION_URL = "/transactions";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();

  const [userContext, setUserContext] = useState({});
  const [alldata, setAllData] = useState({});
  const [transactions, setTransactions] = useState({});

  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    localStorage.getItem("persist") || false
  );

  //    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  // gets one users
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(AUTH_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUserContext(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // gets all users
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllData = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setAllData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAllData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  //gets all transactions
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTransactions = async () => {
      try {
        const response = await axiosPrivate.get(TRANSACTION_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTransactions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTransactions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        userContext,
        setUserContext,
        alldata,
        setAllData,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
