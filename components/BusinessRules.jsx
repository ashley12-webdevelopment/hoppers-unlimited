import React from 'react'
import styles from "../styles/BusinessRules.module.css"

const BusinessRules = () => {
  return (
    <div className={styles.container}>
      <p className={styles["main-heading"]}>Booking Conditions</p>
      <p>Hoppers Unlimited is based in Lyndhurst, Victoria - 3975, Australia</p>
      <p className={styles["secondary-heading"]}>please note we have the following conditions when it comes to making a booking</p>
      <ul>
        <li><b>Minimum headcount</b> for a booking is <b>25</b>.</li>
        <li>for events <b>more than 40kms</b> from the business the <b>minimum headcount is 35</b>.</li>
      </ul>
    </div>
  )
}

export default BusinessRules
