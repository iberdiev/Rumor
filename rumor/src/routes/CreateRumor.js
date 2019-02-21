import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class CreateRumor extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/v1/rumors/create/', {
            title: this.state.title,
            description: this.state.description,
            author_token: localStorage.getItem('token'),
        }, {
            headers:{
                Authorization: 'Token ' + localStorage.getItem('token'),
            }
        }).then(res =>{
            console.log(res);
            this.props.history.push('/');
        }).catch(err => {
            console.log(err)
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Title of the rumor</h2>
                    <br/>
                    <input maxlength="300" type="text" onChange = {e => this.setState({ title: e.target.value})} />
                    <br/>
                    <h2>Description of the rumor</h2>
                    <textarea maxlength="2500" onChange = {e => this.setState({ description: e.target.value})}/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateRumor);
