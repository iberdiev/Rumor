import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import OneRumor from '../components/rumors/OneRumor';

class Rumor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data : []
        };
        this.token = localStorage.getItem('token');
    }

    componentDidMount = () =>{

        axios.get('http://127.0.0.1:8000/api/v1/rumors/',{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {

            const data = res.data.reverse();

            this.setState({
                isLoaded: true,
                data: data,

            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }

    render(){
        const {isLoaded, data} = this.state;
        if (!isLoaded){
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else{
            return(
                <div>
                    <span>
                      <ul>
                        <li id='newPost'><Link to='/rumor/create'>New Post</Link></li> 
                        <li><Link to='/logout/'>Log out</Link></li>
                      </ul>
                    </span>
                    <ol>
                    {data.map(rumor => (
                        <OneRumor key={rumor.id} rumorId={rumor.id} title={rumor.title} description={rumor.description} pub_date={rumor.pub_date} authorToken={rumor.author_token}/>
                    ))
                    }
                    </ol>
                </div>
            )
        }
    }
}
export default Rumor;
