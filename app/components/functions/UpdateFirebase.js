import React from 'react';
import firebase from "../../firebase.js";

function UpdateFirebase(arg){
    console.log("Updating Firebase");
    //console.log(arg);
    const JSON = arg; 
    //JSON.map(item => ( console.log("test")));
    Object.entries(JSON.list).map((Data) => {
        // basic mean convert to array play here.... 
        //console.log(Data);
        //console.log(Data[1]);
        const data = {city: Data[1].name, weather: Data[1].weather[0].main, description: Data[1].weather[0].description, temp: Data[1].main.temp};
        //console.log(data);
        //console.log(Data[1].id);
        try{
           const res = firebase.database().ref('Weather/'+Data[1].id+"/").set(data);
         }catch(error){
             
        }
    });
//   
};

export default UpdateFirebase;