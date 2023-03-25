import styles from "../../styles/Booking.module.css";
import FormRow from "./FormRow";
import FormRowDatePicker from "./FormRowDatePicker";
import FormRowTextArea from "./FormRowTextArea";
import {useForm} from "react-hook-form";
import axios from "axios";

import {useState,useEffect} from 'react';

import Loader from "../utils/Loader";
import Modal from "../utils/Modal";

const initialValues = {contactName:"",contactNumber:"0438912323",contactEmail:"ashleydesilva2002@gmail.com",headCount:"26",eventAddress:"12 test street",kmsToDestination:undefined}



const BookingForm = () => {
  const {register,handleSubmit,formState:{errors},control,trigger,setValue,reset} = useForm({defaultValues:initialValues});

  const [kmsToDestination,setKmsToDestination] = useState(undefined);

  const [formSubmitting,setFormSubmitting] = useState(false);
  // const [submissionCompleteMessage,setSubmissionCompleteMessage] = useState("");
  const [bookingProcessComplete,setBookingProcessComplete] = useState(false);
  const [modalMessage,setModalMessage] = useState({})



  const onFormSubmit = async (formData)=>{
    console.log(formData);
    setFormSubmitting(true);
    try{
      const data = await axios.post("/api/booking",formData);
      console.log(`FORM SUUCESSFULLY SUBMITTED`,data);
      // setSubmissionCompleteMessage(`booking successfully sent`);
      setModalMessage({type:"success",title:"booking successfully sent",content:"We will call you soon"});
      reset();
    }catch(error){
      console.log(`error:`,error.message);
      // setSubmissionCompleteMessage(`Error sending message.Please contact site administration.${err.message}`);
            setModalMessage({type:"error",title:"booking error",content:`Error sending message.Please contact site administration.${error.message}`})

    }

    setFormSubmitting(false);
    setBookingProcessComplete(true);

  }


  // useEffect to handle head count 
  useEffect(()=>{

    if(kmsToDestination!=undefined){
      trigger("headCount");
    }
  },[kmsToDestination])
  
  // useEffect(()=>{

  //   const subscription = watch((data)=>{
  //     if(data.eventAddress === "melbourne"){
  //       console.log(`Address changed`, data);
  //       setKmsToDestination(50);
  //     }
  //   })

  //   return ()=>{subscription.unsubscribe();}

  // },[watch])

  // console.log(`RERENDER`);



  // console.log(errors);

  return (
    <>
    {/* <Modal showModal={bookingProcessComplete} closeModal={setBookingProcessComplete} msg={{type:"success",title:"title",content:"content"}}/> */}
    <Modal showModal={bookingProcessComplete} closeModal={setBookingProcessComplete} msg={modalMessage}/>
    <section className={styles.section}>
        <div className={styles["section-center"]}>
            <h1 className={styles.title}>Hoppers Unlimited</h1>
            <h2 className={styles["sub-title"]}>Booking Form</h2>
            {/* <h3 className={styles["subheading-3"]}>for all bookings please fill and submit the form below. We will be in touch with you soon</h3> */}
            <p className={styles["subheading-3"]}>Bookings for any party, event and functions please fill and submit the form below. We will be in touch with you soon</p>
        
        <form className={`form ${styles["event-form"]}`} onSubmit={handleSubmit(onFormSubmit)} noValidate>
          {/* SECTION 1 - Contact */}
          <div className={`${styles["group-section"]} ${styles["group-contact-section"]}`}>

            <FormRow
              type="text"
              labelText="contact person"
              register={register("contactName",{required:{value:true,message:"contact name required!!"}})}
              errors={errors}
              required={true}
            />
            <FormRow
              type="number"
              labelText="contact number"
              register={register("contactNumber",{required:{value:true,message:"contact number required!!"}})}
              errors={errors}
              required={true}
            />
            <FormRow
              type="email"
              labelText="contact email"
              register={register("contactEmail",{required:{value:true,message:"contact email required!!"}, pattern: {
                              value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "invalid email address",
                          }})}
              errors={errors}
              required={true}
            />

          {/* <div className="spacer"/> */}
          </div>




          {/* SECTION 2 - Event Details */}
            <div className={`${styles["group-section"]} ${styles["group-event-section"]}`}>
                    <FormRowDatePicker
                        control={control}
                        errors={errors}
                        name="eventDate"
                        labelText="event date and time"
                        required={true}
                        minDate={new Date()}
                        rules={{required: { value: true, message: "event date and time required!!" }}}
                        // selectedDate={values.eventDate}
                   />

                    <FormRow
                      type="number"
                      additionalProperties={{min:25}}
                      labelText="head count"
                      register={register("headCount",{required:{value:true,message:"head count required!!"},min:{value:kmsToDestination>=50?35:25,message:`minimum head count is ${kmsToDestination>=50?"35":"25"}`}})}
                      errors={errors}
                      required={true}
                      placeholder="number of people to serve"
                    />

                    <FormRow
                      type="text"
                      labelText="event address"
                      register={register("eventAddress",{required:{value:true,message:"event address required!!"}})}
                      errors={errors}
                      required={true}
                      customCss={styles["full-width-field"]}
                    />

                     <FormRowTextArea
                        labelText="additional comments"
                        register={register("additionalComments")}
                        customCss={styles["full-width-field"]}
                    />
            </div>
            
          
          <button type="submit" disabled={formSubmitting} className={`btn ${styles["btn-event"]}`}>{formSubmitting?<><Loader width={`1.25rem`} height={`1.25rem`}/><p>submitting ....</p></>:<p>submit booking</p>}</button>
          {/* testing purposes */}
          {/* <button type="button" onClick={()=>{setKmsToDestination(50);setValue("kmsToDestination",50);}}>Travel far</button>
          <button type="button" onClick={()=>{setKmsToDestination(20);setValue("kmsToDestination",20);}}>Travel local</button> */}
        </form>
        
        
        </div>
    </section>
    </>
  )
}

export default BookingForm
