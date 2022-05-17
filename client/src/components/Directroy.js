import { Link } from "react-router-dom"

const Directory = () => {
    return (
        <section style={{backgroundColor:"grey"}}>
            <h1>Site Directory</h1>
            <p>Permission based accessible links</p>
            <br />
            <h4>All User </h4>
            <Link to="/">HomePage</Link>
            <Link to="/login">Login</Link>
            <Link to="/createaccount">Register</Link>
             <Link to="/directory">Directory</Link>
            <Link to="/about">About</Link>
            <Link to="/unauthorized">Unauthorized info Page</Link>
            <br />
            <h4>Private</h4>
            <Link to="/editor">Editors Page</Link>
            <Link to="/admin">Admininistration Page</Link>
        </section>
    )
}

export default Directory
