import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-center"]}>
        Copyright &copy; {new Date().getFullYear()}<span>Hoppers Unlimited</span>
      </div>
    </footer>
  )
}

export default Footer
