import styles from './Button.module.css';

export const Button = ({ text, cor }) => {
    const corClass = styles[cor];
    
    return (
        <button className={`${styles.btn} ${corClass}`}>
            {text}
        </button>
    )
}