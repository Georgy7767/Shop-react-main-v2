const API_URL="http://localhost:3001/users";

export async function getUsers() {
    const responce=await fetch(API_URL);
    return responce.json();  
}
export async function registerUser(user) {
    const responce=await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
    });
    return responce.json();
}
