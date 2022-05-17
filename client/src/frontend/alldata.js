import  {useState, useEffect } from 'react';
import axios from "axios";

const DATA_URL = "/users";

export default function AllData() {
  const [data, setData] = useState([{}]);
  const[errMsg, setErrMsg] = useState();
    const [accounts, setAccounts] = useState([{
        _id:"",
        user:"",
        email:"",
        pwd:"",
        accountType:"",
        accountNumber:0,
        created:"",
        balance:0,
    }])

    
    useEffect(() => {

      fetch(
        "http://localhost:3500/users"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setAccounts(data);
        });
    }, []);
  
    console.log(accounts)
return (
    <>
        {
          accounts.map((account,index) =>
    <table key={index }  className="table table-hover table-fixed">
    <tbody>
    <tr>
      <th>User Name</th>
      <td key={accounts.user}>{account.user}</td>
    </tr>
    <tr>
      <th>Email</th>

      
      <td key={accounts._id}>{account.email}</td>
    </tr>
    <tr>
      <th>Password</th>
      <td key={accounts._id} type="password">{
        account.pwd}</td>
    </tr>
    <tr>
      <th>Balance</th>
      <td key={accounts._id}>{account.balance}</td>
    </tr>
    <tr>
      <th>Date Created</th>
      <td key={accounts._id}>{account.created}</td>
    </tr>
    <tr>
      <th>Account Type</th>
      <td key={accounts._id}>{account.accountType}</td>
    </tr>
    </tbody>
  </table>)}

    </>
)


      }

