import React from 'react';
import firebase from "../firebase.js";

export default class Comments extends React.Component {
    constructor(props){
        super(props);
        this.fetchComments = this.fetchComments.bind(this);
        let value = props.value;
        //console.log("propsvalue: "+props.value);
        this.state = {
        Arg: value,
        Comments: []
        };
    };

    fetchComments() {
        var count = 0;
        const newState = [];
        //console.log("Comments/"+this.state.Arg)
        var ref = firebase.database().ref("Comments/"+this.state.Arg);
        // Query only for the comments
        ref.limitToLast(10).on("child_added", (snapshot) => {
           //console.log(snapshot.key);
           newState.push({
               key: snapshot.key,
               user: snapshot.child("user").val(),
               text: snapshot.child("text").val()
           });
           count++;
           this.forceUpdate();
        });
      this.setState({
          Comments: newState
      });
      return(newState); 
    }
    componentDidMount() {
        var array = this.fetchComments();
        this.setState({
            Comments: array
        })
      }

    render(){
        const { t } = this.props
        return (
        <div className="Comments">
            <ul>
            {this.state.Comments.map(item => (
                <li key={item.key}>
                <div>{item.user}: {item.text}</div>
                </li>
            ))}
            </ul>
         </div>
        )
    }
}