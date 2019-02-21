import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class CommentEdit extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            rumorId: this.props.match.params.number,
            commentId: this.props.match.params.commentNumber,
            userToken: localStorage.getItem('token'),
        }

    }

    getComment = () =>{
        axios.get('http://127.0.0.1:8000/api/v1/rumors/' + this.state.rumorId + '/comments/',{
            headers:{
                Authorization: 'Token ' + this.state.userToken,
            }
        }).then(res => {
            let { data } = res;

            data = data.filter((value) =>{
                return value.author_token === this.state.userToken && value.id.toString() === this.state.commentId;
            })[0];
            if (data === undefined) {
                this.props.history.push('/');
            }
            if (this.unmount) return;
            this.setState({
                data: data,
                isLoaded: true,
            })
        }).catch(err => {
            console.log(err.error);
        })
    }

    componentWillUnmount(){
        this.unmount = true
    }

    componentDidMount(){
        this.getComment()
    }


    handleChange = () =>{

        axios.put('http://127.0.0.1:8000/api/v1/comments/' + this.state.commentId + '/', {
            rumor: this.state.rumorId,
            comment_text: this.state.data.comment_text,
        }, {
            headers:{
                Authorization: 'Token ' + this.state.userToken,
            }
        }).then( res => {
            this.props.history.push('/rumor/' + this.state.rumorId + '/comments');
        }).catch(err => {
            console.log(err.error);
        })

    }

    render(){

        const { isLoaded } = this.state

        if (!isLoaded){
            return (
                <div>
                    <h1>Loading....</h1>
                </div>
            )
        } else {

            return (
                <div>
                    <h2>Anonym</h2>
                    <input type="text" maxlength="300" defaultValue={this.state.data.comment_text} onChange={e => this.setState({data:{ comment_text: e.target.value }})} /><br/>
                    <button onClick={this.handleChange}>Submit</button>
                </div>
            )
        }
    }

}

export default withRouter(CommentEdit);
