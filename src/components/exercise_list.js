import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Exercise=props=>{
  return(
  <tr>
     <td>{props.exercise.username}</td>
     <td>{props.exercise.description}</td>
     <td>{props.exercise.duration}</td>
     <td>{props.exercise.date.substring(0,10)}</td>
     <td>
      <Link to={"/edit/"+props.exercise._id}></Link>|<button onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
     </td>
  </tr>
  );
};

export default class ExerciseList extends React.Component{
 constructor(props){
  super(props);
  this.deleteExercise=this.deleteExercise.bind(this);
  this.state={exercises:[]};
 }
 componentDidMount(){
  axios.get('http://localhost:5000/exercises')
  .then(res=>{
      this.setState({exercises:res.data})
  })
  .catch(err=>console.log("Error"+err));
 }
 deleteExercise(id){
  axios.delete('http://localhost:5000/exercises/'+id)
  .then(res=>{
    console.log(res.data);
  });
  this.setState({
    exercises:this.state.exercises.filter(el=>el._id!==id)
  })
 }
 exerciseList(){
  return this.state.exercises.map(curr=>{
    return <Exercise exercise={curr} deleteExercise={this.deleteExercise} key={curr._id}/>;
  })
 }
  render(){
    return(
      <div>
        <h3>Logged Exercises</h3>
        <table>
          <thead>
          <tr>
            <th>UserName</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
}

