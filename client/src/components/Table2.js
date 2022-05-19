import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const TRANSACTION_URL = "/transaction";

export default function Table2() {
  const [user, setUser] = useState('')
  const [balance, setBalance] = useState()
  const [accountNumber, setAccountNumber] = useState();
  const [transactions, setTransactions] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTransactions = async () => {
      try {
        const response = await axiosPrivate.get("/transaction", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTransactions(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getTransactions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
       <div>
       <div>
        <h4
          className="header"
          style={{
            fontSize: "1.3rem",
            color: "white",
            padding: ".4rem",
            border: "solid black 1px",
            backgroundColor: "#0079d5",
            width: "100%",
          }}
        >
           Account No. ending in: xxx-xxx-xxx-{accountNumber} 
        </h4>
       
        <h4
          className="header"
          style={{
            fontSize: "1.3rem",
            color: "white",
            padding: ".4rem",
            border: "solid black 1px",
            backgroundColor: "grey",
            width: "100%",
          }}
        >
          Current Balance: ${balance}
        </h4>
       
      </div>
       <h4
          className="header"
          style={{
            fontSize: "1.3rem",
            color: "white",
            padding: ".4rem",
            border: "solid black 1px",
            backgroundColor: "grey",
            width: "100%",
          }}
        >
          Welcome {user}!
        </h4>
      <table className="table table-hover table-fixed table-striped">
          <tr style={{ width: "100%" }}>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Transaction Date </th>
          </tr>
    
        {transactions?.length ? (
          <tr>
            {transactions.map((transaction, i) => (
              <td key={i}>
                <b>Amount:</b>${transaction?.amount}
                <b>Transaction Type:</b>
                {transaction?.transactionType}
                <b>Transaction Date:</b>
                {transaction?.transactionDate}
              </td>
            ))}
          </tr>
        ) : (
          <p>No transactions to display</p>
        )}
      </table>
    </div>


    </>
 

  );
}
