import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditRumor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            id: this.props.match.params.number,
            url: 'http://127.0.0.1:8000/api/v1/rumors/' + this.props.match.params.number + '/',
            userToken: localStorage.getItem('token'),
            isSubmitButtonDisabled: false,
            isDeleteButtonDisabled: false,
        };
    }

    componentDidMount = () => {

        axios.get(this.state.url, {
            headers:{
                Authorization:'Token ' + this.state.userToken,
            }
        }).then(res => {
            this.setState({
                title: res.data.title,
                description: res.data.description,
                isLoaded: true,
            });
        }).catch(err => {
            console.log(err.error);
        });


    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({isSubmitButtonDisabled: true,});

        axios.put(this.state.url, {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
        }, {
            headers:{
                Authorization:'Token ' + this.state.userToken,
            }
        }).then(res => {
            this.props.history.push('/');
        }).catch(err =>{
            console.log(err.error);
        })

    }

    handleDelete = (event) =>{
        event.preventDefault();

        this.setState({isDeleteButtonDisabled: true})

        axios.delete(this.state.url, {
            headers:{
                Authorization: 'Token ' + this.state.userToken,
            }
        }).then(res => {
            console.log(res);
            this.props.history.push('/');
        }).catch(err => {
            console.log(err.error);
        });

    }

    render(){
        const {isLoaded} = this.state;

        if (!isLoaded){
            return(
                <div>
                    Loading the rumor
                </div>
            )
        } else {
            const {title, description} = this.state;
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Title</h2>
                        <input type="text" maxlength="300" value={title} onChange={e => this.setState({title: e.target.value})}/>
                        <br/>
                        <h2>Description</h2>
                        <textarea maxlength="2500" onChange={e => this.setState({description: e.target.value})} defaultValue={description}/>
                        <br/>
                        <button id='edit' disabled={this.state.isSubmitButtonDisabled} type="submit">{this.state.isSubmitButtonDisabled ? 'Submiting...' : 'Submit changes'}</button>
                        <button id='edit' disabled={this.state.isDeleteButtonDisabled} onClick={this.handleDelete}>{this.state.isDeleteButtonDisabled ? 'Deleting...' : 'Delete' }</button>
                    </form>
                </div>
            )
        }
    }

}

export default withRouter(EditRumor);
