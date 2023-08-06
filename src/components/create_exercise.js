import React from 'react';
import axios from'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
export default class CreateExercise extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      description:"",
      duration:"",
      date:new Date(),
      users:[]
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    axios.get('http://localhost:5000/users')
    .then(res=>{
      this.setState({
        users:res.data.map(user=>user.username),
        username:res.data[0].username
      })
    })
    
    // this.setState({
    //   users:['test state'],
    //   username:'test state'
    // });
  }
  onChangeUsername(e){
    this.setState({
      username:e.target.value
    });
  }
  onChangeDescription(e){
    this.setState({
      description:e.target.value
    });
  }
  onChangeDuration(e){
    this.setState({
      duration:e.target.value
    });
  }
  onChangeDate(date){
    this.setState({
      date:date
    });
  }
  onSubmit(e){
    e.preventDefault();
    const obj={
      username:this.state.username,
      description:this.state.description,
      duration:this.state.duration,
      date:this.state.date
    }
    console.log(obj);

    axios.post('http://localhost:5000/exercises/add',obj)
    .then(res=>console.log(res.data))
    .catch(err=>console.log("Axios Error"+err))
    window.location='/';
  }
  render(){
    return( 
    <div>
      <h3>Create new exercises log</h3>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Username:</label>
          <select ref="userinput"
          required
          value={this.state.username}
          onChange={this.onChangeUsername}>
          {
            this.state.users.map(function(user){
              return <option
              key={user}
              value={user}>{user}
              </option>;
            })
          }
          </select>
        </div>
        <div>
          <label>Description: </label>
          <input type="text"
          required
          value={this.state.description}
          onChange={this.onChangeDescription}
          />
        </div>
        <div>
          <label>Duration: </label>
          <input type="text"
          required
          value={this.state.duration}
          onChange={this.onChangeDuration}
          />
        </div>
        <div>
          <label>Date: </label>
          <div>
            <DatePicker
            selected={this.state.date}
            onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div>
          <input type="submit" value="Create Exercise Log"/>
        </div>
      </form>
    </div>
    )
  }
}