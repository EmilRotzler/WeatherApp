
import React from 'react';
import firebase from "../firebase.js";
import Comments from "./Comments";

export default class Weather extends React.Component {
    constructor(props){
        super(props);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSort = this.onSort.bind(this);
        this.state = {
        Weathers: [],
        Orderby: "city",
        Start: "Desc"
        };
    };

    fetchWeather() {
        var count = 0;
        const newState = [];

        var ref = firebase.database().ref("Weather/");
        //console.log(this.state.Start);
    if(this.state.Start == "Desc"){
            //console.log("desc ran");
        ref.orderByChild(this.state.Orderby).limitToFirst(100)
        .on("child_added", (snapshot) => {
           //console.log(snapshot.key+" test "+snapshot.child("city").val()+" ");
           newState.push({
               key: snapshot.key,
               city: snapshot.child("city").val(),
               weather: snapshot.child("weather").val(),
               description: snapshot.child("description").val(),
               temp: snapshot.child("temp").val()
           });
           count++;
           this.forceUpdate();
        });
    }
    if(this.state.Start == "Asc"){
        //console.log("asc ran");
        ref.orderByChild(this.state.Orderby).limitToLast(100)
        .on("child_added", (snapshot) => {
           //console.log(snapshot.key+" test "+snapshot.child("city").val()+" ");
           newState.push({
               key: snapshot.key,
               city: snapshot.child("city").val(),
               weather: snapshot.child("weather").val(),
               description: snapshot.child("description").val(),
               temp: snapshot.child("temp").val()
           });
           count++;
           this.forceUpdate();
        });
    }
      this.setState({
          Weathers: newState
      });
      return(newState); 
  };
  sendComment(event){
    event.preventDefault();
    console.log("key test "+event.target[0].defaultValue);
    //alert('You submitted a comment: ' + this.state.value);
    const data = {
        user: this.state.name,
        text: this.state.comment
    };
    if(this.state.name != "" && this.state.comment != undefined){   
        //console.log(data);
        try{
        const res = firebase.database().ref('Comments/'+event.target[0].defaultValue+"/").push(data);
        }catch(error){
            console.log(error);
        }
    }
 
    // clear form and input
    this.setState({name: "", comment:""});
    document.getElementById("commentForm").reset();
  };
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  };
  onSort(event){
      var StartBy = "Desc";
      if(this.state.Orderby == event.target.value){
          if(this.state.Start == "Desc"){
              StartBy = "Asc"
          }
          if(this.state.Start == "Asc"){
              StartBy =  "Desc"
          }
      }

    this.setState({
        Orderby: event.target.value,
        Start: StartBy
    });
    //console.log(StartBy);
   // console.log("Sortby: "+this.state.Orderby);
    this.forceUpdate();
    this.fetchWeather();
 };
  componentDidMount() {
    var array = this.fetchWeather()
    this.setState({
        Weathers: array
    })
  };
  render(){
    return (
        <div class="allcities container">
            <h1>All cities</h1>
            <div className="sorting">
                Sort by: 
                <button class="button" type="button" value="city" onClick={this.onSort}>
                  City {this.state.Orderby}
                </button>
                <button class="button" type="button" value="temp" onClick={this.onSort}>
                  Temperature {this.state.Orderby}
                </button>
            </div>
        <div>
        <ul class="weatherList col-md-12 row">
        {this.state.Weathers.map(item => (
        <li class="weatherItem col-md-3" key={item.city}>
          <div class="spacer">
            <div class="weatherItemInfo">
                <div class="city">{item.city} </div>
                <div class="temp">{item.temp}</div>
                <div class="weather">{item.weather}</div>
                <div class="description">{item.description}</div>
            </div>
            <form id="commentForm" onSubmit={this.sendComment}>
    <              input type="hidden" name="key"  value={item.key} readOnly={true}/> 
            <label>
    <              input class="commentInput" type="text" name="name" placeholder="Username" onChange={this.handleChange}/> 
            </label>
            <label>
    <              input class="commentInput" type="text" name="comment" placeholder="Comment" onChange={this.handleChange} /> 
            </label>
             <input class="button" type="submit" value="Add Comment" />
            </form>
            <Comments value={item.key} />

            </div>
        </li>
         ))}
      </ul>
      </div>
      </div>
    )
}
}