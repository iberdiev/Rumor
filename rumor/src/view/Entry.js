import React from 'react';

import Registration from '../components/Registration'
import Login from '../components/Login'


class Entry extends React.Component{

    render(){
        return (
            <div>
                <Registration />
                <Login />
            </div>
        )
    }

}

export default Entry;