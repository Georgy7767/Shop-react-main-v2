import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, registerUser } from "../../api/usersApi";
import styles from "./RegisterPage.module.css"
function RegisterPage(){
    const navigate=useNavigate();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    async function handleRegister(event) {
        event.preventDefault();
        const users=await getUsers();
        const foundUser=users.find((user)=>
        user.email===email)
        if(foundUser){
            alert("Эта почта уже используется");
            return;
        }
        const newUser={
            name:name,
            email:email,
            password:password,
        };
        await registerUser(newUser);
        alert("Регистрация прошла успешно");
        navigate("/login");
    }
    return(
        <div className={styles.container}>
        <h1>Регистрация</h1>
        <form className={styles.form} onSubmit={handleRegister}>
            <input type="text" 
            placeholder="Введите имя"
            value={name}
            onChange={(event)=>setName(event.target.value)}/>
            <input type="text" 
            placeholder="Введите почту"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}/>
            <input type="text" 
            placeholder="Введите пароль"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}/>
            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
        </div>
    )
}
export default RegisterPage;