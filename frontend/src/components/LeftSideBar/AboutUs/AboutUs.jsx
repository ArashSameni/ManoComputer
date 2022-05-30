import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={styles.container}>
            <h1>Mano Computer</h1>
            <h3 onClick={() => window.electronAPI.openBrowser("https://github.com/ArashSameni/")}>Arash Sameni</h3>
            <h3 onClick={() => window.electronAPI.openBrowser("https://github.com/DDoe297")}>Danny Khorasanizadeh</h3>
        </div>
    );
}

export default AboutUs;