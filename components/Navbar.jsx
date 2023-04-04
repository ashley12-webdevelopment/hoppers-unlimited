import React from 'react'
import logo from "../public/images/logo.png"
import Image from 'next/image'
import Link from "next/link";
import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["nav-center"]}>
        <Link href={`https://hoppersunlimited.com.au`}>
          <Image src={logo} alt="Hoppers Unlimited"/>
        </Link>
        <Link href={`https://hoppersunlimited.com.au`} className={`btn ${styles["btn-backToMain"]}`}>back to main site</Link>
      </div>
    </nav>
  )
}

export default Navbar
