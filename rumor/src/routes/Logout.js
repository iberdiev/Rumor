import React from 'react';
import { withRouter } from 'react-router-dom'

class Logout extends React.Component{
    constructor(props){
        super(props);
        localStorage.removeItem('token');
        this.props.history.push('/');
        window.location.reload();
    }
}

export default withRouter(Logout);
