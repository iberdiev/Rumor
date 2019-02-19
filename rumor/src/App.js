import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './routes/Main';
import Error from './routes/Error';
import EditRumor from './routes/EditRumor';
import CreateRumor from './routes/CreateRumor';
import Logout from './routes/Logout';
import Comments from './routes/Comments';
import CommentEdit from './routes/CommentEdit';

class App extends React.Component{

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Main} exact />
                    <Route path='/rumors/:number' exact component={EditRumor}/>
                    <Route path='/rumor/create' exact component={CreateRumor} />
                    <Route path='/logout' exact component={Logout} />
                    <Route path='/rumor/:number/comments' exact component={Comments}/>
                    <Route path='/rumor/:number/comments/edit/:commentNumber' exact component={CommentEdit}/>
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
