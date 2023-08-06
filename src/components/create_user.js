import React from 'react';
import axios from 'axios';
export default class CreateUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:""
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeUsername(e){
    this.setState({
      username:e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();
    const user={
      username:this.state.username, 
    }
    console.log(user);
    axios.post('http://localhost:5000/users/add',user)
    .then(res=>console.log(res.data))
    .catch(err=>console.log("Axios Error"+err))
    this.setState({
      username:' '
    })
  }
  render(){
    return(
      <div>
      <h3>Create new User</h3>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Username:</label>
          <input type="text"
          required
          value={this.state.username}
          onChange={this.onChangeUsername}
          />
        </div>
        <div>
          <input type="submit" value="Create Exercise Log"/>
        </div>
      </form>
    </div>
    )
  }
}