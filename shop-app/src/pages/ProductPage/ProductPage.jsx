import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/productsApi";
import styles from "./Product.module.css"

function ProductPage(){
    const navigate=useNavigate();
    const {id}=useParams();
    console.log(id);
    
    const[product,setProduct]=useState(null);
    const[activeImage,setActiveImage]=useState("");
    const[selectedColor,setSelectedColor]=useState(null);
    useEffect(()=>{
            async function loadProducts(){
                const data=await getProductById(id);
                setProduct(data);
                setActiveImage(data.images?.[0]||data.image)
            }
            loadProducts();
            
        },[id])
        function choseeColor(color){
            setSelectedColor(color);
            setActiveImage(color.image);
        }
        function addToCart(){
            const user=localStorage.getItem("user");
            if(!user){
                alert("Чтобы добавить товар в корзину нужно войти")
                navigate("/login");
                return;
            }
            const cart=JSON.parse(localStorage.getItem("cart"))|| [];
            const cartProductId=selectedColor?`${product.id}-${selectedColor.name}`:product.id;
            
            const foundProduct=cart.find((item)=>
                item.cartId===cartProductId)
            if (foundProduct) {

              if (foundProduct.count >= product.stock) {
        
                alert("Товара больше нет на складе");
        
                return;
        
              }
        
              foundProduct.count += 1;
        
            } else {
        
              cart.push({
        
                ...product,
        
                cartId: cartProductId,
        
                image: activeImage,
        
                selectedColor: selectedColor?.name || "Не выбран",
        
                count: 1,
        
              });
        
            }
        
            localStorage.setItem("cart", JSON.stringify(cart));
        
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Товар добавлен в корзину")
            
        }
        if(!product){
            return <p>Загрузка....</p>
        }
    return(
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate("/catalog")}>
              ← Назад в каталог
            </button>
            <h1 className={styles.title}>{product.title}</h1>
    
          <div className={styles.product}>
            <div className={styles.left}>
             
              <img className={styles.mainImage} src={activeImage} alt={product.title}/>
              <div className={styles.thumbs}>
                {product.images?.map((image)=>(
                  <button key={image}
                  className={`${styles.thumb} ${activeImage===image?styles.activeThumb : ""}`}
                onClick={()=>setActiveImage(image)}>
                  <img src={image} alt={product.title} />
                </button>
                ))}
              </div>
            </div>

    
            <div className={styles.right}>
              
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>
                {product.price} $
              </p>
              <p className={styles.stock}>Осталось: {product.stock} шт.</p>
          
              <button className={styles.add} onClick={addToCart}>
                ДОБАВИТЬ В КОРЗИНУ
              </button>
              <div className={styles.colorBlock}>
                <h3>Цвет</h3>
                  <div className={styles.colors}>
                    {product.colors?.map((color)=>(
                      <button key={color.name}
                      title={color.name}
                      className={`${styles.color} ${selectedColor?.name===color.name?styles.activeColor : ""}`}
                      style={{backgroundColor:color.value}}
                      onClick={()=>choseeColor(color)}/>
                    ))}
                  </div>
              </div>

              <div className={styles.info}>
                    <h2>Характеристики</h2>
                    <p>{product.characteristics}</p>
                    <p>Осталось: {product.stock} шт.</p>
              </div>
            </div>
          </div>
        </div>
      )
}
export default ProductPage;