import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();
  const [showCatalog, setShowCatalog] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(null);
  const user = localStorage.getItem('user');

  const catalogMenu = {
    'Снаряжение': ['Перчатки', 'Шлема', 'Бинты', 'Капы', 'Защита', 'Тренажёры'],
    'Обувь': ['Боксерки'],
    'Аксессуары': ['Аксессуары']
  };

  function logout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* ЛОГОТИП */}
        <Link to="/catalog" className={styles.logo}>
          <span className={styles.logoIcon}>🥊</span>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>TANK</span>
            <span className={styles.logoSub}>FIGHT SHOP</span>
          </div>
        </Link>

        {/* НАВИГАЦИЯ */}
        <nav className={styles.nav}>
          {/* КАТАЛОГ С ВЫПАДАЮЩИМ МЕНЮ */}
          <div 
            className={styles.catalogWrapper}
            onMouseEnter={() => setShowCatalog(true)}
            onMouseLeave={() => {setShowCatalog(false); setShowSubmenu(null)}}
          >
            <button className={styles.catalogBtn}>
              КАТАЛОГ
              <span className={styles.arrow}>▼</span>
            </button>

            {showCatalog && (
              <div className={styles.dropdown}>
                {Object.entries(catalogMenu).map(([category, subcategories]) => (
                  <div 
                    key={category}
                    className={styles.dropdownItem}
                    onMouseEnter={() => setShowSubmenu(category)}
                    onMouseLeave={() => setShowSubmenu(null)}
                  >
                    <span className={styles.categoryName}>{category}</span>
                    <span className={styles.arrowRight}>▶</span>

                    {showSubmenu === category && (
                      <div className={styles.submenu}>
                        {subcategories.map((sub) => (
                          <button 
                            key={sub}
                            className={styles.submenuItem}
                            onClick={() => {
                              navigate('/catalog');
                              setShowCatalog(false);
                              setShowSubmenu(null);
                            }}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/catalog" className={styles.navLink}>ТОВАРЫ</Link>
          <Link to="/cart" className={styles.navLink}>КОРЗИНА</Link>
        </nav>

        {/* АВТОРИЗАЦИЯ */}
        <div className={styles.auth}>
          {user ? (
            <div className={styles.userBlock}>
              <span className={styles.userName}>👤 {user}</span>
              <button onClick={logout} className={styles.logoutBtn}>ВЫЙТИ</button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.authLink}>ВОЙТИ</Link>
              <Link to="/register" className={styles.authLinkReg}>РЕГИСТРАЦИЯ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;