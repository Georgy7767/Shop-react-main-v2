import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers} from "../../api/usersApi";
import styles from "./LoginPage.module.css"
function LoginPage(){
    const navigate=useNavigate();
    
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    async function handleLogin(event) {
        event.preventDefault();
        const users=await getUsers();
        const foundUser=users.find((user)=>
        user.email===email && user.password===password);
        if(!foundUser){
            alert("Неверная почта или пароль");
            return;
        }
        localStorage.setItem("user",JSON.stringify(foundUser))
        
        alert("Вход выполнен");
        navigate("/catalog");
    }
    return(
       <div className={styles.container}>
               <h1>Авторизация</h1>
               <form className={styles.form} onSubmit={handleLogin}>
                   <input type="text" 
                   placeholder="Введите почту"
                   value={email}
                   onChange={(event)=>setEmail(event.target.value)}/>
                   <input type="text" 
                   placeholder="Введите пароль"
                   value={password}
                   onChange={(event)=>setPassword(event.target.value)}/>
                   <button type="submit">
                       Войти
                   </button>
               </form>
               </div>
           
    )
}
export default LoginPage;