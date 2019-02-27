import React from 'react';
import axios from 'axios';


class Registration extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSubmitDisabled: false,
        }
        this.error = false;
    }

    onSubmit = event =>{
        event.preventDefault();
        this.setState({
            isSubmitDisabled: true,
        });
        
        const request = {
            username: this.state.username,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
        }
        axios.post('http://127.0.0.1:8000/api/v1/rest-auth/registration/', request)
        .then(res => {
            localStorage.setItem('token', res.data.key);
            window.location.reload();
        }).catch(err =>{
            this.error = true;
            this.setState({isSubmitDisabled: false,});
            this.forceUpdate();
        });
    }

    wrongCredentials = () => {
        if (this.error){
            return (
                <h3>There is a person with either the same email or username</h3>
            )
        }
    }

    render(){
        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <h1> Sign Up </h1>
                <input type='text' onChange={e => this.setState({username: e.target.value})} placeholder="Username"/> /><br />
                <input type='text' onChange={e => this.setState({email: e.target.value})} placeholder="Email"/><br />
                <input type='password' onChange={e => this.setState({password1: e.target.value})} placeholder="Password"/><br />
                <input type='password' onChange={e => this.setState({password2: e.target.value})} placeholder="Confirm password"/><br />
                <button disabled={this.state.isSubmitDisabled} type='submit'>{this.state.isSubmitDisabled ? 'Registering...' : 'Register'}</button>
                {this.wrongCredentials()}
            </form>
         </div>
        )
    }
}

export default Registration;
