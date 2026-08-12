import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./CartPage.module.css"

function CartPage(){
    const navigate=useNavigate();
    const [cart,setCart]=useState(JSON.parse(localStorage.getItem("cart"))||[]);
    const [toast,setToast]=useState(null);
    
    function showToast(msg){
        setToast(msg);
        setTimeout(()=>setToast(null),2400);
    }
    
    function removeFromCart(id){
        const newCart=cart.filter((item)=>item.id!==id);
        setCart(newCart);
        localStorage.setItem("cart",JSON.stringify(newCart));
        showToast("Товар удален");
    }

    function clearCart(){
        setCart([]);
        localStorage.removeItem("cart");
        showToast("Корзина очищена");
    }

    function increaseCount(id){
        const newCart=cart.map((item)=>{
            if (item.id===id){
                if(item.count>=item.stock){
                    showToast("Товара больше нет на складе");
                    return item;
                }
                return{...item,count:item.count+1};
            }
            return item;
        });
       setCart(newCart);
       localStorage.setItem("cart",JSON.stringify(newCart));
    }

    function decreaseCount(id){
        const newCart=cart.map((item)=>{
            if (item.id===id){
                return{...item,count:item.count-1};
            }
            return item;
        }).filter((item)=>item.count>0);
       setCart(newCart);
       localStorage.setItem("cart",JSON.stringify(newCart));
    }

    const totalPrice=cart.reduce((sum,item)=>sum+item.price*item.count,0);
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Корзина</h1>
                <button className={styles.backBtn} onClick={()=>navigate("/catalog")}>
                    Назад в каталог
                </button>
            </div>

            {cart.length===0?(
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>🛒</div>
                    <h2>Корзина пуста</h2>
                    <p>Добавьте товары из каталога</p>
                    <button className={styles.emptyBtn} onClick={()=>navigate("/catalog")}>
                        Перейти в каталог
                    </button>
                </div>
            ): (
                <>
                    <div className={styles.items}>
                        {cart.map((item)=> (
                            <div className={styles.item} key={item.id}>
                                <div className={styles.imgWrap}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className={styles.details}>
                                    <h3>{item.title}</h3>
                                    <p className={styles.price}>{item.price.toLocaleString()} ₽ / шт</p>
                                    <div className={styles.row}>
                                        <div className={styles.counter}>
                                            <button 
                                                disabled={item.count===1} 
                                                onClick={()=>decreaseCount(item.id)}
                                            >-</button>
                                            <span>{item.count}</span>
                                            <button onClick={()=>increaseCount(item.id)}>+</button>
                                        </div>
                                        <p className={styles.sum}>
                                            {(item.price*item.count).toLocaleString()} ₽
                                        </p>
                                        <button 
                                            className={styles.removeBtn}
                                            onClick={()=>removeFromCart(item.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totalBlock}>
                        <p className={styles.totalPrice}>
                            Итого: <span>{totalPrice.toLocaleString()} ₽</span>
                        </p>
                        <button className={styles.clearBtn} onClick={clearCart}>
                            Очистить корзину
                        </button>
                    </div>
                </>
            )}

            {toast && <div className={styles.toast}>{toast}</div>}
        </div>
    )
}

export default CartPage;
