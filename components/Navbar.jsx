import React from 'react'
import logo from "../public/images/logo.png"
import Image from 'next/image'
import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["nav-center"]}>
        <Image src={logo} alt="Hoppers Unlimited"/>
      </div>
    </nav>
  )
}

export default Navbar
