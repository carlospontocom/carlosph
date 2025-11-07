import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.Header}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <Link to="/">Logo</Link>
                </div>
                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">Sobre</Link>
                        </li>
                        <li>
                            <Link to="/formulario">Cadastre-se</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;