import styles from "../../styles/Booking.module.css";
import FormRow from "./FormRow";
import FormRowAddress from "./FormRowAddress";
import FormRowDatePicker from "./FormRowDatePicker";
import FormRowTextArea from "./FormRowTextArea";
import {useForm} from "react-hook-form";
import axios from "axios";

import {useState,useEffect} from 'react';

import Loader from "../utils/Loader";
import Modal from "../utils/Modal";
import BusinessRules from "../BusinessRules"

const initialValues = {contactName:"",contactNumber:"",contactEmail:"",headCount:25,eventAddress:"",eventCoordinates:undefined,kmsToDestination:undefined}



const BookingForm = () => {
  const {register,handleSubmit,formState:{errors},control,trigger,setValue,getValues,reset} = useForm({defaultValues:initialValues});


  //some useState values (tried to take these off but could not)
  const [address,setAddress] = useState("");
  const [kmsToDestination,setKmsToDestination] = useState(undefined);

  const [formSubmitting,setFormSubmitting] = useState(false);
  const [bookingProcessComplete,setBookingProcessComplete] = useState(false);
  const [modalMessage,setModalMessage] = useState({})



  const onFormSubmit = async (formData)=>{
    console.log(formData);
    setFormSubmitting(true);
    try{
      const data = await axios.post("/api/booking",formData);
      console.log(`FORM SUUCESSFULLY SUBMITTED`,data);
      setModalMessage({type:"success",title:"booking successfully sent",content:"We will call you soon"});
      reset();
      setAddress("");
      setKmsToDestination(undefined);
    }catch(error){
      console.log(`error:`,error.message);
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
            <h1 className={styles.title}>Hoppers Unlimited - Booking Form</h1>
            {/* <h2 className={styles["sub-title"]}>Booking Form</h2> */}
            {/* <h3 className={styles["subheading-3"]}>for all bookings please fill and submit the form below. We will be in touch with you soon</h3> */}
            <p className={styles["subheading-3"]}>Bookings for any party, event and function please fill and submit the form below. We will be in touch with you soon.</p>
      
          <BusinessRules/>
        <form className={`form ${styles["event-form"]}`} onSubmit={handleSubmit(onFormSubmit)} autoComplete="off" noValidate>
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
              type="string"
              labelText="contact number"
              // register={register("contactNumber",{required:{value:true,message:"contact number required!!"},minLength:{value:8,message:"valid phone number required!!"},maxLength:{value:10,message:"valid phone number required!!"},pattern:{value:/^\d+$/,message:"valid phone number required!!"}})}
              register={register("contactNumber",{required:{value:true,message:"contact number required!!"},pattern:{value:/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,message:"valid phone number required!!"}})}
              errors={errors}
              required={true}
            />
            <FormRow
              type="email"
              labelText="contact email"
              register={register("contactEmail",{pattern: {
                              value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "invalid email address",
                          }})}
              errors={errors}
              required={false}
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
                        rules={{required: { value: true, message: "event date and time required!!" },validate:{isFutureDate:(value)=>value>new Date()||"Future date required!!"}}}
                        // selectedDate={values.eventDate}
                   />

                    <FormRow
                      type="number"
                      additionalProperties={{min:25}}
                      labelText="head count"
                      register={register("headCount",{required:{value:true,message:"head count required!!"},pattern:{value:/^\d+$/,message:"whole number without decimal places required!!"},min:{value:kmsToDestination>40?35:25,message:`minimum head count is ${kmsToDestination>40?"35":"25"}`}})}
                      // register={register("headCount",{required:{value:true,message:"head count required!!"},min:{value:25,message:`minimum head count is 25`},validate:{longDistant:(value)=>(getValues().kmsToDestination<50 && (value>=25 && value<35)) || "minimumhead count is 35"}})}
                      errors={errors}
                      required={true}
                      placeholder="number of people to serve"
                    />

                    <FormRowAddress
                      type="text"
                      labelText="event address"
                      register={register("eventAddress",{required:{value:true,message:"event address required!!"},validate:{coordinatesRequired:()=>(getValues().eventCoordinates!=="" && getValues().eventCoordinates!=undefined) || "valid address required!! Please select an address from dropdown suggestions"}})}
                      address={address}
                      setAddress={setAddress}
                      errors={errors}
                      required={true}
                      customCss={styles["full-width-field"]}
                      placeholder="Enter event address"
                      setValue={setValue}
                      trigger={trigger}
                      setKmsToDestination={setKmsToDestination}
                      kmsToDestination={kmsToDestination}//for display purpses
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
