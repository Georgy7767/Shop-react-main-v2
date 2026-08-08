import { Link } from 'react-router-dom';
import styles from './FooterPage.module.css';

function FooterPage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));
    const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.columnBrand}>
                    <Link to="/catalog" className={styles.logo}>
                        Shop
                    </Link>
                    <p className={styles.brandDescription}>
                        Минималистичный онлайн-магазин базовой одежды и концептуальных аксессуаров с доставкой по всей стране.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4>Магазин</h4>
                    <nav className={styles.nav}>
                        <Link to="/catalog">Каталог</Link>
                        <Link to="/cart">
                            Корзина {cartCount > 0 && `(${cartCount})`}
                        </Link>
                   
                    </nav>
                </div>

                

                <div className={styles.column}>
                    <h4>Кабинет</h4>
                    <nav className={styles.nav}>
                        {user ? (
                            <>
                                <Link to="/profile">Мой профиль</Link>
                                <Link to="/orders">История заказов</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Войти в аккаунт</Link>
                                <Link to="/register">Регистрация</Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className={styles.column}>
                    <h4>Контакты</h4>
                    <div className={styles.contacts}>
                        <p>support@shop.com</p>
                        <p>8 (800) 555-35-35</p>
                        <p className={styles.workingHours}>Ежедневно: 10:00 — 22:00</p>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} Shop. All rights reserved.</p>
                <div className={styles.legalLinks}>
                    <Link to="/terms">Условия использования</Link>
                </div>
            </div>
        </footer>
    );
}

export default FooterPage;

