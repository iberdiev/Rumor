import React from 'react';
import Entry from '../view/Entry';
import Rumor from '../view/Rumor';

class Main extends React.Component{
    
    render(){
        
        const userToken = localStorage.getItem('token');
        
        if (userToken != null){
            return (
                <Rumor />
            )
        } else{
            return(
                <Entry />
            )
        }
    }
}

export default Main;
