import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component { // get token through login
  state = {
    username: '',
    password: '',
    email: '',
  }
  onSubmit = val => {
    val.preventDefault();
    axios.post('http://10.129.0.108:8000/api/v1/rest-auth/login/', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    })
    .then(function (response) {
      console.log(response.data.key);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  usernameChange = val => {
    this.setState(
      {username: val.target.value}
    )
  }
  passwordChange = val =>{
    this.setState(
      {password: val.target.value}
    )
  }
  render() {
    return (
      <div>
          <form onSubmit={this.onSubmit}>
            <input type='text' id='username' onChange={this.usernameChange}/>
            <input type='password' id='password' onChange={this.passwordChange}/>
            <button type='submit'>login</button>
          </form>
      </div>
    )
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// class App extends Component { //get all rumors
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//     }
//   }
//   componentDidMount() {
//     fetch('http://10.129.0.108:8000/api/v1/rumors/', {
//       method: 'GET',
//       headers: {
//         'Authorization': ' Token '+'0fdff3ccf15ded1ce35a087dbc708369519b0827',
//         'Content-Type': 'application/json'}
//     })
//     .then(res => res.json())
//     .then(json => {
//       this.setState({
//         isLoaded: true,
//         items: json,
//       })
//     })
//   }
//   render() {
//       var {isLoaded, items} = this.state;
//     if (!isLoaded) {
//       return <div>Loading...</div>
//     } else {
//       return (
//         <div>
//         {items.map(rumor => (
//                 <h4 key={rumor.id}>{rumor.id} ||| {rumor.title} ||| {rumor.description} </h4>
//               ))}
//         </div>
//     )}
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class App extends Component { //registration
//     state = {
//       username: '',
//       email: '',
//       password1: '',
//       password2: '',
//     }
//
//     onSubmit = val => {
//       val.preventDefault();
//       axios.post('http://10.129.0.108:8000/api/v1/rest-auth/registration/', {
//         username: this.state.username,
//         email: this.state.email,
//         password1: this.state.password1,
//         password2: this.state.password2,
//       })
//       .then(function (response) {
//         console.log('this.state');
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     }
//
//     render(){
//       return(
//         <div>
//           <form onSubmit={this.onSubmit}>
//             <h3>username</h3><input type='text' id='username' onChange={e => this.setState({username: e.target.value})} /><br />
//             <h3>email</h3><input type='text' id='email' onChange={e => this.setState({email: e.target.value})} /><br />
//             <h3>password1</h3><input type='text' id='password1' onChange={e => this.setState({password1: e.target.value})} /><br />
//             <h3>password2</h3><input type='text' id='password2' onChange={e => this.setState({password2: e.target.value})} /><br />
//             <button type='submit'>Signup</button>
//           </form>
//         </div>
//       )
//     }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class App extends Component { //get specific rumor
//   constructor(props) {
//     super(props);
//     this.state = {
//       rumor: [],
//       isLoaded: false,
//     }
//   }
//   componentDidMount() {
//     fetch('http://10.129.0.108:8000/api/v1/rumors/20/', {
//       method: 'GET',
//       headers: {
//         'Authorization': ' Token '+'0fdff3ccf15ded1ce35a087dbc708369519b0827',
//         'Content-Type': 'application/json'}
//     })
//     .then(res => res.json())
//     .then(json => {
//       this.setState({
//         isLoaded: true,
//         rumor: json,
//       })
//     })
//   }
//   render() {
//       var {isLoaded, rumor} = this.state;
//     if (!isLoaded) {
//       return <div>Loading...</div>
//     } else {
//       return (
//         <div>
//           <h4 key={rumor.id}>{rumor.id} ||| {rumor.title} ||| {rumor.description} </h4>
//         </div>
//     )}
//   }
// }
//
// export default App;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class App extends Component { //get all comments of specific rumor
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//     }
//   }
//   componentDidMount() {
//     fetch('http://10.129.0.108:8000/api/v1/rumors/20/comments/', {
//       method: 'GET',
//       headers: {
//         'Authorization': ' Token '+'0fdff3ccf15ded1ce35a087dbc708369519b0827',
//         'Content-Type': 'application/json'}
//     })
//     .then(res => res.json())
//     .then(json => {
//       this.setState({
//         isLoaded: true,
//         items: json,
//       })
//     })
//   }
//   render() {
//       var {isLoaded, items} = this.state;
//     if (!isLoaded) {
//       return <div>Loading...</div>
//     } else {
//       return (
//         <div>
//         {items.map(rumor => (
//                 <h4 key={rumor.id}>comment ID - {rumor.id} ||| {rumor.comment_text} ||| rumor ID - {rumor.rumor} </h4>
//               ))}
//         </div>
//     )}
//   }
// }

export default App;
