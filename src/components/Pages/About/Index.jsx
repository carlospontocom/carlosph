import styles from './About.module.css';

function About() {
    return (
        
        <div className={styles.aboutContainer}>
            <h1 className={styles.title}>Sobre Nós</h1>
            <p className={styles.text}>
                Somos uma equipe de desenvolvedores apaixonados por criar 
                experiências incríveis para a web. Nosso objetivo é combinar 
                design e tecnologia para construir aplicações modernas e intuitivas.
            </p>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <i className="fa-brands fa-react"></i>
                    <h3>React</h3>
                    <p>Construímos interfaces de usuário reativas e performáticas com React.</p>
                </div>
                <div className={styles.card}>
                    <i className="fa-solid fa-code"></i>
                    <h3>Código Limpo</h3>
                    <p>Escrevemos código limpo, semântico e de fácil manutenção.</p>
                </div>
                <div className={styles.card}>
                    <i className="fa-solid fa-paintbrush"></i>
                    <h3>Design Moderno</h3>
                    <p>Criamos designs modernos e atraentes, focados na experiência do usuário.</p>
                </div>
            </div>
        </div>
    );
}

export default About;