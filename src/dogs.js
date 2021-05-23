import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Image, Button, Dropdown, Header, Segment } from 'semantic-ui-react';
import breedsList from './breedslist'


function Dogs()  {
 
  /////const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState('image/egments.gif' );
  
  //Assume Beagle is found. Need to feed promises into one 
  //another. Get the list of dogs, check for Beagle and do
  //the appropriat logic to get it photo 
  const [breed, setBreed] = useState({full: "", url: ""})
  const [dropDownLoading, setDropDownLoading] = useState(true)
  const [photoLoading, setPhotoLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(true)
  const [breeds, setBreeds] = useState([{key: "", value: "", text: ""}])

 
  const openingBreed = "Beagle"
  
  const BREED_SELECT = "breed_select"
 
  const ANOTHER_PIC = "another_pic"
 
  const specificRequest = 'https://dog.ceo/api/breed/**/images/random'
  const breedsRequest = 'https://dog.ceo/api/breeds/list/all'
   
  const picGet = async (theBreed) => {
    await axios.get(specificRequest.replace("**",theBreed))
    .then(response => {
      updateSrc(response.data.message);
    })
    .catch(error => {
      console.log(error);
    })
  }
  

   
   const setUpOpeningBreed = (breeds, openingBreed) => {
       const firstFound = breeds.find(item => 
          (item.text.toLowerCase().localeCompare(
                                openingBreed.toLowerCase()) === 0)
       )
       return (firstFound !== undefined) ?
         {full: firstFound.text, url: firstFound.text.toLowerCase().replace(' ',"/")}
       : {full: breeds[0].text, url: breeds[0].text.toLowerCase().replace(' ',"/")}
       
   }
 
   useEffect( () => {
   
    var actualOpeningBreed = ""
    
    const full = async () => {
    //First promise for list of breeds. We defina an opening breed
    //We make sure it is there plus build the list for the dropdown
     await   axios.get(breedsRequest)
    .then(response => {
       let dropOptions = breedsList(response.data.message)
       setBreeds(dropOptions )  
       //Is the opening breed at top of program actually in the
       //list of dog breeds
       actualOpeningBreed  = setUpOpeningBreed(dropOptions,openingBreed)
       setBreed(actualOpeningBreed )
    })
    .catch(error => {
      console.log(error);
    })
 
 
     //Second promise for first image.  The breed for the initial image
     //is set in the first promise
     await axios.get(specificRequest.replace("**",actualOpeningBreed.url))
    .then(response => {
      setDropDownLoading(false)
      setPhotoLoading(false)
      setButtonLoading(false)
      updateSrc(response.data.message);
    })
    .catch(error => {
      setDropDownLoading(false)
      setPhotoLoading(false)
      setButtonLoading(false)
      
      setBreed({full: "Error", url: "?"})
      console.log(error);
    })
    
    }
    
    full() 
    return () => {}},[]
  )
  
  
  const state = async (event, data, change) => {
    switch (change) {
      case BREED_SELECT: {
        const {text} = data.options[data.value]
        let url = text.toLowerCase().replace(' ',"/")
        setBreed({full: text, url: url})
        setButtonLoading(true)
        await picGet(url)  //Note the await before axios in picGet
        setButtonLoading(false)
        break
      }
      case ANOTHER_PIC: {
        setButtonLoading(true)
        await picGet(breed.url) //Note the await before axios in picGet
        setButtonLoading(false)
        break
      }
      
      default: {
       console.log("Should not be here") 
      }
    }
    
    
  }

 
  return (
     <React.Fragment>
     <Header as='h1' dividing >No Cats Allowed </Header>  


     <Dropdown
       placeholder='Select Breed'
       search
       selection
       options={breeds}
       loading = {dropDownLoading}
       onChange={(event, data) => state(event, data, BREED_SELECT)}
    />
    <Button loading={buttonLoading}  onClick={(event,data) => state(event, data, ANOTHER_PIC)}>Another Picture</Button>
   <Segment>
     <Header as='h1' >{breed.full}</Header>  
     <Image src={currentSrc} centered size='large' />
   </Segment>
     </React.Fragment>
   
  )
};

export default Dogs;
