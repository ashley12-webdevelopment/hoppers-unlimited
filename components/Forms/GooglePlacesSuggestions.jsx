import React from 'react'
import { MdLocationPin, MdOutlineLocationCity } from "react-icons/md";


const GooglePlacesSuggestions = ({suggestions,getSuggestionItemProps,styles}) => {

    const filteredSuggestions = suggestions.reduce((acc,curr)=>{
        const {types} = curr;
        const includeWords = ["street_address","premise","subpremise","establishment"];

        includeWords.every((value)=>{
            if(types.includes(value)){
                acc.push({...curr,"selectedType":value});
                return false;
            }

            return true;
        });

        return acc;

    },[]);

    // console.log('filtered',filteredSuggestions);//19/01/2025

    
        // if(filteredSuggestions.length === 0){
        //     return (
        //         <div className={styles["suggestion-item"]}>No search results found. Please check your address</div>
        //     )
        // }
    

    
  return (
    <>
          {filteredSuggestions.map((suggestion,index)=>{
                      return <div key={index} {...getSuggestionItemProps(suggestion)} className={`${styles["suggestion-item"]} ${suggestion.active?styles["suggestion-item--active"]:null}`}>{suggestion.selectedType==="establishment"?<MdOutlineLocationCity/>:<MdLocationPin/>}{suggestion.description}</div>
                  })}
    </>
  )
}

export default GooglePlacesSuggestions
