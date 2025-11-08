import { Button } from '../../Button/Index';
import styles from './Home.module.css';
 
function Home() {
    return (
        <>
        <section className={styles.bgSection}>
            <div className="container">
                <div className={styles.homeContainer}>
                    {/* <FaLaptopCode size={45} */}

                    <h1>
                        Criando sites Dinâmicos com REACT.JS
                    </h1>
                    <p>
                        Front-end, Back-end e Banco de Dados funcionals e projeto prático. Tornei-me um habilitado para desenvolvimento full-stack.
                    </p>
                    <div className={styles.buttonsContainer}>
                        <Button text="Cursos EaD" cor="orange" />
                        <Button text="Explore mais" cor="blue" />
                    </div>
                </div>
            </div>
        </section>

         </>
    )
}

export default Home;