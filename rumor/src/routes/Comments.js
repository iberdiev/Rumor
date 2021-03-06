import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class Comments extends React.Component{

    constructor(props){
        super(props);
        if (localStorage.getItem('token') === null){
            this.props.history.push('/');
        }
        this.state = {
            isLoaded: false,
            rumorId: this.props.match.params.number,
            apiURL: 'http://127.0.0.1:8000/api/v1/rumors/' + this.props.match.params.number + '/',
            userToken: localStorage.getItem('token'),
            isCommentButtonDisabled: false,
            isDeleteButtonDisabled: false,
        };
    }

    getData = () =>{
        axios.all([
            axios.get(this.state.apiURL, {
                headers:{
                    Authorization:'Token ' +  this.state.userToken,
                }
            }),
            axios.get(this.state.apiURL + 'comments/', {
                headers:{
                    Authorization:'Token ' + this.state.userToken,
                }
        })]).then(axios.spread( (rumor, comments) =>{
                this.setState({
                    isLoaded: true,
                    rumor: rumor.data,
                    comments: comments.data.reverse(),
                });
        })).catch( err => {
                console.log(err.error);
        });
    }

    componentDidMount = () =>{
        this.getData()
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { newComment } = this.state;

        if (newComment !== undefined || newComment !== ''){
            this.setState({ isCommentButtonDisabled: true, })

            axios.post(this.state.apiURL + 'comments/create/', {
                rumor: this.state.rumorId,
                comment_text: newComment,
            }, {
                headers:{
                    Authorization: 'Token ' + this.state.userToken,
                }
            }).then(res => {
                this.getData();
                this.setState({isCommentButtonDisabled: false,})
                this.forceUpdate();
            }).catch(err =>{
                console.log(err.error);
            })
        }
    }

    deleteComment = (event) =>{
        event.preventDefault();

        this.setState({ isDeleteButtonDisabled: true, })

        axios.delete('http://127.0.0.1:8000/api/v1/comments/'+ event.target.id +'/', {
            headers: {
                Authorization: 'Token ' + this.state.userToken,
            }
        }).then( () => {
            this.getData();
            this.setState({isDeleteButtonDisabled: false,})
            this.forceUpdate();
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        const { isLoaded } = this.state
        if (!isLoaded) {
            return (
                <div>
                    <h1>Loading.....</h1>
                </div>
            )
        } else {
            const { rumor, comments } = this.state;
            return (
                <div>
                    <div>
                        <h1>{rumor.title}</h1>
                        <h3>{rumor.description}</h3>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Comment:</h3>
                            <input maxlength="300" type="text" onChange={e => this.setState({ newComment: e.target.value })} />
                            <button id='edit' disabled={this.state.isCommentButtonDisabled} type="submit">{this.state.isCommentButtonDisabled ? 'Commenting...' : 'Comment'}</button>
                        </form>
                        <hr/>
                    </div>
                    <div>
                        {comments.map( (comment, index) =>(
                            <div key={index}>
                                <h2>&#9774;&#9774;&#9774;</h2>
                                <h3>{comment.comment_text}</h3>
                                { this.state.userToken === comment.author_token ? (
                                <div>
                                    <button disabled={this.state.isDeleteButtonDisabled} id={comment.id} onClick={this.deleteComment} >{ this.state.isDeleteButtonDisabled ? 'Deleting...' : 'Delete' }</button>
                                    <Link id='except' to={'/rumor/' + this.state.rumorId + '/comments/edit/' + comment.id}><button>Edit</button></Link>
                                </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }

}

export default withRouter(Comments);
