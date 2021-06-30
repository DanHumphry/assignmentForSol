import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'views/pages/Home';
import Detail from 'views/pages/Detail';
import './App.css';
import css from './App.module.scss';

function App() {
  return (
    <main>
      <section className={css.HomeMainSection}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={['/a', '/b']} component={Detail} />
        </Switch>
      </section>
    </main>
  );
}

export default App;
