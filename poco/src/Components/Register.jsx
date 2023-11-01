import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Full name</label>
            <input value={name} name="name" id="name" placeholder="full Name"/>
            <label htmlFor="email">email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">password</label>
            <input value={password} type="password" placeholder="*********" id="password" name="password"/>
            <button type="submit">Register</button>
        </form>
        <button onClick={() => props.onFormSwitch("login")}>Already have an account? Login here.</button>
        </>
    );
};
