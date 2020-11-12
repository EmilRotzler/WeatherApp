import React from 'react';
import useGet from "restful-react";
import UpdateFirebase from "./UpdateFirebase";
import App from '../App'

function FetchApiData(arg){

    //Running through proxy because of CORS settings
    var proxyUrl = 'https://ancient-bayou-11788.herokuapp.com/';
    var targetUrl = 'https://samples.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=439d4b804bc8187953eb36d2a8c26a02';
    fetch(proxyUrl+targetUrl)
    .then(response => response.json())
    .then(data => {
      //console.log(data);

      //call function response went through
      UpdateFirebase(data);
    })
};
export default FetchApiData;
