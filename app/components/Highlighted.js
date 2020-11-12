import React from 'react';
import firebase from "../firebase.js";

export default class Highlighted extends React.Component {
    constructor(props){
        super(props);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.state = {
        Weathers: []
        };
    };

    fetchWeather() {
        var count = 0;
        const newState = [];

        var ref = firebase.database().ref("Weather/");
        // Query only for cloudy cities
        ref.orderByChild("weather").equalTo("Clouds").on("child_added", (snapshot) => {
           //console.log(snapshot.key+" test "+snapshot.child("city").val());
           newState.push({
               city: snapshot.child("city").val(),
               weather: snapshot.child("weather").val(),
               description: snapshot.child("description").val(),
               temp: snapshot.child("temp").val()
           });
           count++;
           this.forceUpdate();
        });
      this.setState({
          Weathers: newState
      });
      return(newState); 
  };
  componentDidMount() {
    var array = this.fetchWeather()
    this.setState({
        Weathers: array
    })
  }

  render(){
    const { t } = this.props
    return (
        <div class="highligts">
            <h1>Cloudy cities</h1>
            <div class="container">
        <ul class="highlightsList col-md-12">
        {this.state.Weathers.map(item => (
        <li class="highlightItem col-sm-4" key={item.city}>
            <div class="spacer">
            <h3 class="city">{item.city}</h3>
            <h4 class="weather">{item.weather}</h4>
            </div>
        </li>
         ))}
      </ul>
      </div>
            
      </div>
    )
}
}