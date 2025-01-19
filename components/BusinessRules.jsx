import React from 'react'
import styles from "../styles/BusinessRules.module.css"

const BusinessRules = () => {
  return (
    <div className={styles.container}>
      <p className={styles["main-heading"]}>Booking Conditions</p>
      <p>Hoppers Unlimited is based in Lyndhurst, Victoria - 3975, Australia.</p>
      <p className={styles["secondary-heading"]}>Please note we have the following conditions when it comes to making a booking</p>
      <ul>
        <li><b>Minimum headcount</b> for a booking is <b>25</b>.</li>
        <li>For events <b>more than 45kms</b> from the business the <b>minimum headcount is 35</b>.</li>
        <li><b>Cost per Head:</b>&nbsp;AUD$10 (<b>Please note:</b>&nbsp;If event is more than 45km from business, cost per head is <b>AUD$12</b>).</li>
        {/* <li>For events <b>more than 40kms</b> from the business the <b>minimum headcount is subject to change</b>.</li> */}
      </ul>
    </div>
  )
}

export default BusinessRules
