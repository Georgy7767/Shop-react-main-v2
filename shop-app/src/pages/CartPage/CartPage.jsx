import { useNavigate} from "react-router-dom";
import {useState } from "react";
import styles from "./CartPage.module.css"

function CartPage(){
    const navigate=useNavigate();
    const[cart,setCart]=useState(JSON.parse(localStorage.getItem("cart"))||[]);
    
    function removeFromCart(id){
        const newCart=cart.filter((item)=>
        item.id!==id);
        setCart(newCart);
        localStorage.setItem("cart",JSON.stringify(newCart));
    }
    function clearCart(){
        setCart([]);
        localStorage.removeItem("cart");
    }
    function increaseCount(id){
        const newCart=cart.map((item)=>{
            if (item.id===id){
                if(item.count>=item.stock){
                    alert("Товара больше нет на складе")
                    return item;
                }
                return{
                    ...item,count:item.count+1,
                };
            }
            return item;
        });
       setCart(newCart);
       localStorage.setItem("cart",JSON.stringify(newCart));
    }
    function decreaseCount(id){
        const newCart=cart.map((item)=>{
            if (item.id===id){
                return{
                    ...item,count:item.count-1,
                };
            }
            return item;
        }).filter((item)=>item.count>0);
       setCart(newCart);
       localStorage.setItem("cart",JSON.stringify(newCart));
    }
    const totalPrice=cart.reduce((sum,item)=>sum+item.price*item.count,0);
    return(
       
        <div className={styles.container}>
            <h1>Корзина</h1>
            <button onClick={()=>navigate("/catalog")}>Назад в каталог</button>
            {cart.length===0?(
                <p>Корзина пустая</p>
            ):(
                <>
                    <div className={styles.items}>
                        {cart.map((item)=>(
                            <div className={styles.item} key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>Цена: {item.price} rub.</p>
                                    <div className={styles.counter}>
                                        <button disabled={item.count===1} onClick={()=>
                                            decreaseCount(item.id)
                                        }>-</button>
                                        <span>{item.count}</span>
                                        <button onClick={()=>
                                            increaseCount(item.id)
                                        }>+</button>
                                    </div>
                                    <p>Сумма: {item.price*item.count}rub.</p>
                                    <button onClick={()=>removeFromCart(item.id)}>Удалить</button>
                                </div>
                            </div>
                        ))}
                        <h2>Итого: {totalPrice} rub.</h2>
                        <button onClick={clearCart}>Очистить корзину</button>
                    </div>
                </>
            )}
        </div>
        
    )
}
export default CartPage;