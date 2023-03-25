import styles from "../../styles/Modal.module.css"
import { FaTimes } from "react-icons/fa";
import Image from 'next/image';
import logo from "../../public/images/logo.png"
import Link from "next/link";



const Modal = ({msg,showModal,closeModal}) => {
  const { type, title, content } = msg;
  return (
    <div className={`${styles.overlay} ${showModal && styles["overlay-show"]}`}>
              <div className={styles["modal-container"]}>
                    <button type="button" className={styles["btn-close"]} onClick={()=>closeModal(false)}><FaTimes/></button>
                    <div className={styles["modal-content"]}>
                        <Image src={logo} alt="Hoppers Unlimited"/>
                        <h5
                            className={`${styles["title"]} ${
                            type ? styles[`title-${type}`] : ""
                            }`}
                        >
                            {title}
                        </h5>
                        <p className={styles["content"]}>{content}</p>
                        {type!=="error" && 
                          <>
                            <div className={styles["links-container"]}>
                              <Link href="https://hoppersunlimited.com.au" passHref={true}>Home</Link>
                              <Link href="https://hoppersunlimited.com.au/varieties/" passHref={true}>Browse our varities</Link>
                            </div>
                            <button className={`btn ${styles["btn-another-book"]}`} type="button" onClick={()=>{closeModal(false)}}>place another booking</button>
                          </>
                        }
                          </div>
                 
            </div>
    </div>
  )
}

export default Modal
