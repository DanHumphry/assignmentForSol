import React from 'react';
import 'styles/Global.css';
import { Route, Switch } from 'react-router-dom';
import Home from 'views/pages/Home';
import Detail from 'views/pages/Detail';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path={['/a', '/b']} component={Detail} />
    </Switch>
  );
}

export default App;
