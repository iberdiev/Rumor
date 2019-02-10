import React from 'react';
import { Link } from 'react-router-dom';

class OneRumor extends React.Component{

    render() {

        const {title, description, authorToken} = this.props;
        const userToken = localStorage.getItem('token');
        const comments = '/rumor/' + this.props.rumorId + '/comments/';

        if (userToken !== authorToken) {
            return (
                <div>
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                    <span>
                        <Link to={ comments }>Comments</Link>
                    </span>
                    <hr/>
                </div>
            )
        } else {
            
            const editUrl = '/rumors/' + this.props.rumorId;

            return (
                <div>
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                    <span>
                        <Link to={ editUrl }>Edit</Link><br/>
                        <Link to={ comments }>Comments</Link>
                    </span>
                    <hr/>
                </div>
            )
        }
    }

}

export default OneRumor;