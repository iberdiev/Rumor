import React from 'react';
import axios from 'axios';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
        this.error = false;
    }

    onSubmit = event =>{
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/v1/rest-auth/login/', this.state)
            .then(res => {
                localStorage.setItem('token', res.data.key);
                window.location.reload();
            }).catch(err => {
                this.error = true;
                this.forceUpdate();  
            });
    }

    wrongCredentials = () => {
        if (this.error){
            return (
                <h3>Wrong credentials, please check your username or password</h3>
            )
        } 
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='text' onChange={e => this.setState({username: e.target.value})}/>
                    <input type='password' onChange={e => this.setState({password: e.target.value})}/>
                    <button type='submit'>login</button>
                    {this.wrongCredentials()}
                </form>
            </div>
        )
    }
}

export default Login;