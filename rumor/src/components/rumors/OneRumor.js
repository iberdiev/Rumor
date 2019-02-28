import React from 'react';
import { Link } from 'react-router-dom';

class OneRumor extends React.Component{

    render() {

        const {title, description, authorToken,pub_date} = this.props;
        const userToken = localStorage.getItem('token');
        const comments = '/rumor/' + this.props.rumorId + '/comments/';

        if (userToken !== authorToken) {
            return (
                <div id='list1'>
                  <li>
                    <p>

                      <h1>{title}</h1><h4> {pub_date.slice(8, 10) + '/' +  pub_date.slice(5, 7)+ '/'+pub_date.slice(0, 4)+ ' ' +pub_date.slice(11, 19)}</h4>
                    <h3>{description}</h3>
                    <span>
                        <Link to={ comments }>Discussion</Link>
                    </span>
                    </p>
                    </li>
                </div>
            )
        } else {

            const editUrl = '/rumors/' + this.props.rumorId;

            return (
                <div id='list1'>
                  <li>
                    <p>
                    <h1>{title}</h1><h4> {pub_date.slice(8, 10) + '/' +  pub_date.slice(5, 7)+ '/'+pub_date.slice(0, 4)+ ' ' +pub_date.slice(11, 19)}</h4>

                    <h3>{description}</h3>
                    <span>
                      <ul>
                        <li><Link to={ editUrl }>Edit</Link></li>
                        <li><Link to={ comments }>Discussion</Link></li>
                      </ul>
                    </span>
                    </p>
                  </li>
                </div>
            )
        }
    }

}
// <li><p><em>The Netherlands</em> is a country in ...</p></li>
export default OneRumor;
