import { useState } from "react";


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDeafault();
        console.log(email);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">password</label>
            <input value={password} type="password" placeholder="*********" id="password" name="password"/>
            <button type="submit">Log in</button>
        </form>
        <button onClick={() => props.onFormSwitch("register")}>Already have an account? Register here.</button>
        </>
    );
};

export default Login;

