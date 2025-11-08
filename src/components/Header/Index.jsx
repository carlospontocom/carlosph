import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.Header}>
            <div className='container'>
                <div className={styles.navbar}>
                    <div>
                        <NavLink to="/" className={styles.logo}>
                            <i class="fa-brands fa-creative-commons-remix"></i>
                            <span>React4pp</span>
                        </NavLink>
                    </div>
                    <nav className={styles.menu}>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sobre">Sobre</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formulario">Cadastre-se</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;