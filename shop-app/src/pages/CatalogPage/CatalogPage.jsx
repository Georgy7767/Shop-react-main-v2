import { useNavigate } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productsApi";

function CatalogPage(){
    const navigate=useNavigate();
    const[products,setProducts]=useState([]);
    const[selectedCategory,setSelectedCategory]=useState("Все");
    const[loading,setLoading]=useState(true);
    const[toast,setToast]=useState(null);
    
    const categories=["Все",...new Set(products.map(product=>product.category))];
    const filterProduct=selectedCategory==="Все"?
    products:
    products.filter(product=>product.category===selectedCategory);
   
    useEffect(()=>{
        async function loadProducts(){
            try {
                const data=await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    },[])
    
    function addToCart(product){
        const user=localStorage.getItem("user");
        if(!user){
            showToast("Войдите, чтобы добавить в корзину");
            navigate("/login");
            return;
        }
        const cart=JSON.parse(localStorage.getItem("cart"))|| [];
        const foundProduct=cart.find((item)=>item.id===product.id)
        if(foundProduct){
            foundProduct.count+=1;
        }
        else{
            cart.push({...product,count:1});
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        showToast("Товар добавлен в корзину");
    }

    function showToast(msg){
        setToast(msg);
        setTimeout(()=>setToast(null),2400);
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div style={{textAlign: 'center', padding: '100px 0', color: '#b41414'}}>
                    <h2>ЗАГРУЗКА...</h2>
                </div>
            </div>
        );
    }
    
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Каталог товаров</h1>
            <p className={styles.subtitle}>Профессиональная боксёрская атрибутика для настоящих бойцов</p>
            
            <div className={styles.categoriesRow}>
                {categories.map((category)=> (
                    <button 
                        key={category}
                        className={selectedCategory === category ? styles.activeCategory : styles.categoryBtn}
                        onClick={()=>setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className={styles.products}>
                {filterProduct.map((product)=> (
                    <div 
                        className={styles.card} 
                        key={product.id}
                        onClick={()=>navigate(`/product/${product.id}`)}
                    >
                        <div className={styles.imgWrap}>
                            <img src={product.image} alt={product.title}/>
                        </div>
                        <div className={styles.info}>
                            <h3>{product.title}</h3>
                            <p className={styles.price}>{product.price.toLocaleString()} ₽</p>
                        </div>
                        <button 
                            className={styles.addBtn}
                            onClick={(event)=>{
                                event.stopPropagation();
                                addToCart(product);
                            }}
                        >
                            В корзину
                        </button>
                    </div>
                ))}
            </div>

            {toast && <div className={styles.toast}>{toast}</div>}
        </div>
    )
}

export default CatalogPage;