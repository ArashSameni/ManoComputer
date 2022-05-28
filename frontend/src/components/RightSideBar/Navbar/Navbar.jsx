import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <span className={`${styles.NavLink} ${styles.active}`}>Simulator</span>
            <span className={styles.NavLink}>Console</span>
            <span className={styles.NavLink}>Help</span>
        </div>
    )
}

export default Navbar;