import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <a href="#Simulator" className={`${styles.NavLink} ${styles.active}`}>Simulator</a>
            <a href="#Console" className={styles.NavLink}>Console</a>
            <a href="#Help" className={styles.NavLink}>Help</a>
        </div>
    )
}

export default Navbar;