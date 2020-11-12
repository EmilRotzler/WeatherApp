
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "../firebase.js";
import Weather from "./Weather";
import Highlighted from "./Highlighted";
import FetchApiData from "./functions/FetchApiData";
import useGet from "restful-react";
import Styles from 'css-loader?modules!./App.css';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.onClickHandler = this.onClickHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        // call the api update function
    }

    componentDidMount(){
       //console.log("mounted");
       //get new data
       const test = FetchApiData("test");
    }

    onClickHandler(){
        this.forceUpdate()
    }

    render(){
        //const { t } = this.props
        return (
            <div class="Weather"><div class="col-md-12">
           <link rel="stylesheet" href="./App/styles.css" />
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />

            <div>Weather App by Emil A. Rotzler</div>

            <Highlighted />

            <Weather />

            <button class="button" type="button" onClick={this.onClickHandler}>
               Refresh
            </button>
             </div>
          </div>
        )
    }
};