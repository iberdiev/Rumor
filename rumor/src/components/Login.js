import React from 'react';
import axios from 'axios';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
        };
        this.error = false;

    }

    onSubmit = event =>{
        event.preventDefault();
        this.setState({ isLoginDisabled: true, })

        axios.post('http://127.0.0.1:8000/api/v1/rest-auth/login/', this.state)
            .then(res => {
                localStorage.setItem('token', res.data.key);
                window.location.reload();
            }).catch(err => {
                this.error = true;
                this.setState({isLoginDisabled: false,});
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
                <h1>Log In</h1>
                <form onSubmit={this.onSubmit}>
                    <input type='text' onChange={e => this.setState({username: e.target.value})} placeholder="Username"/><br/>
                    <input type='password' onChange={e => this.setState({password: e.target.value})} placeholder="Password"/><br/>
                    <button disabled={this.state.isLoginDisabled} type='submit'>{this.state.isLoginDisabled ? 'Loging...' : 'Log in'}</button>
                    {this.wrongCredentials()}
                </form>
            </div>
        )
    }
}

export default Login;
