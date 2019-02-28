import React from 'react';
import { Link } from 'react-router-dom';

class OneRumor extends React.Component{

    render() {

        const {title, description, authorToken, pub_date} = this.props;
        const userToken = localStorage.getItem('token');
        const comments = '/rumor/' + this.props.rumorId + '/comments/';
        const editUrl = '/rumors/' + this.props.rumorId;

        return (
          <div className="list1">
            <li>
              <p>
              <h1>{title}</h1>
              <h4> {pub_date.slice(8, 10) + '/' +  pub_date.slice(5, 7)+ '/'+pub_date.slice(0, 4)+ ' ' +pub_date.slice(11, 19)}</h4>
              <h3>{description}</h3>
              <span>
                <ul>
                  {authorToken === userToken ? (<li><Link to={ editUrl }>Edit</Link></li>): ''}
                  <li><Link to={ comments }>Discussion</Link></li>
                </ul>
              </span>
              </p>
            </li>
          </div>
        )
    }

}
export default OneRumor;
