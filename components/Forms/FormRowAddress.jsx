import PlacesAutocomplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete";
import { useState,useEffect } from "react";
import styles from "../../styles/FormRowAddress.module.css"

import GooglePlacesSuggestions from "./GooglePlacesSuggestions";

const FormRowAddress = ({
  type,
  register,
  address,
  setAddress,
  labelText,
  required,
  errors,
  placeholder,
  additionalProperties,
  customCss,
  setValue,
  trigger,
  setKmsToDestination,
  kmsToDestination
}) => {

  //coordinate here is for visualisation(not required)
  const [coordinate,setCoordinate] = useState({lat:null,lng:null});
  const [searchOptions,setSearchOptions] = useState(null);


  const handleSelect = async (value)=>{
    const results = await geocodeByAddress(value);
    console.log(results);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    
    setCoordinate(latLng);
    setAddress(value); //so that we get the full SELECTED address not what they have typed in so far
    setValue("eventAddress",value);
    setValue("eventCoordinates",latLng);
    trigger("eventAddress");

    console.log(latLng);
    const service = new google.maps.DirectionsService();
    console.log(service);

    // Get the Kms to the destination
    const shopCoordinate = {lat:-38.0701,lng:145.25315}

     const {status,routes} = await service.route({

       origin:shopCoordinate,
       destination:latLng,
     travelMode: google.maps.TravelMode.DRIVING,
     },
    //  (result,status)=>{
    //   console.log(result);
    //  }
    );


    console.log(status,routes);

    if(status === "OK" && routes){
      const route = routes[0];
      const Kms = (route.legs[0].distance.value/1000).toFixed(1);
      console.log('Kms',Kms);

      setValue("kmsToDestination",Kms);
      setKmsToDestination(Kms);
      
    }


   
    
  }


  useEffect(()=>{
    const google = window.google;
  
    if(google){

    //     const center = new google.maps.LatLng(-38.0701, 145.25315);
    // const defaultBounds = {
    //                         north: center.lat + 0.1,
    //                         south: center.lat - 0.1,
    //                         east: center.lng + 0.1,
    //                         west: center.lng - 0.1,
    //                       };

      setSearchOptions({
        location: new google.maps.LatLng(-38.0701, 145.25315),
        radius: 50000, //50kms
        // bounds: defaultBounds,
        // strictBounds: true,
          // rankby:"distance",
          // types:["address"],//address
          componentRestrictions: {country: "aus"}
        });
    }
  },[])

  if(searchOptions==null)return (<div>LOADING.....</div>);
  return (
    <>
      <div className={`form-row ${customCss}`} >
        <label htmlFor={register.name} className={`form-label`}>
          {labelText || register.name}
          {required && <span className={`form-row-required`}> *</span>}
        </label>
       
        <div>
          <PlacesAutocomplete debounce={400} value={address} onChange={(value)=>{setAddress(value);setValue("eventAddress",value)}} onSelect={handleSelect} searchOptions={searchOptions}
          >
            {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
              <div className={styles["parent-container"]}>
                <p>Lat: {coordinate.lat}</p>
                <p>Lon: {coordinate.lng}</p>
                <p>Kms to destination: {kmsToDestination?kmsToDestination:"-"}</p>
                <input className={`form-input ${styles["address-input"]}`} {...getInputProps({placeholder})} autoComplete="none" />
                <div className={styles["suggestions-container"]} >
                  {console.log(suggestions)}
                  {loading?<div className={styles["loading"]}>loading...</div>:null}

                  <GooglePlacesSuggestions suggestions={suggestions} getSuggestionItemProps={getSuggestionItemProps} styles={styles} />

                  {/* {suggestions.map((suggestion,index)=>{
                      return <div key={index} {...getSuggestionItemProps(suggestion)} className={`${styles["suggestion-item"]} ${suggestion.active?styles["suggestion-item--active"]:null}`}><BiLocationPlus/>{suggestion.description}</div>
                  })} */}
                </div>
          
              </div>
            )}

          </PlacesAutocomplete>
        </div>


        {errors[register.name] && <span className={`form-row-error`}>{errors[register.name].message}</span>}
      </div>
    </>
  );
};

export default FormRowAddress;
