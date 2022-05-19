// import { createContext, useState } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";

// const USERS_URL = "/:email"
// const UserContext = createContext({});

// export const UserProvider = ({ children }) => {
//     const axiosPrivate = useAxiosPrivate();
//     const [userContext, setUserContext] = useState({});

//     // gets one users
//     useEffect(() => {
//         let isMounted = true;
//         const controller = new AbortController();

//         const getUser = async () => {
//             try {
//                 const response = await axiosPrivate.get(USERS_URL, {
//                     signal: controller.signal
//                 });
//                 console.log(response.data);
//                 isMounted && setUserContext(response.data); 
//             } catch (err) {
//                 console.error(err);
//             }
//         }

//         getUser();

//         return () => {
//             isMounted = false;
//             controller.abort();
//         }
//     }, [])

//     return (
//         <UserContext.Provider value={{ userContext, setUserContext }}>
//             {children} 
//         </UserContext.Provider>
//     )
// }

// export default UserContext;