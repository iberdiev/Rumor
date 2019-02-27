import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class CreateRumor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isButtonDisabled: false,
            empty: false,
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        const {title, description} = this.state;
        const author_token = localStorage.getItem('token');

        if ((title === undefined || title==='') && (description === undefined || description === '')) {

            this.setState({empty: true, descriptionOfError: 'If you want to create a rumor please add the title and the description'})

        } else if (title === undefined || title === '') {

            this.setState({empty: true, descriptionOfError: 'Please add the title to your rumor'});

        } else if (description === undefined || description === ''){

            this.setState({empty: true, descriptionOfError: 'Please add a discription to your rumor'});

        } else {
            this.setState({ isButtonDisabled: true })

            axios.post('http://127.0.0.1:8000/api/v1/rumors/create/', {
                title: title,
                description: description,
                author_token: author_token,
            }, {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('token'),
                }
            }).then(res =>{
                this.props.history.push('/');
            }).catch(err => {
                console.log(err)
            });
        }
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
                    <button id='edit' disabled={this.state.isButtonDisabled} type="submit">{this.state.isButtonDisabled ? 'Submiting...' : 'Submit'}</button>
                    {this.state.empty ? this.state.descriptionOfError : ''}
                </form>
            </div>
        )
    }
}

export default withRouter(CreateRumor);
