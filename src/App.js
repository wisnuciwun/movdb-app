import React, { Suspense } from 'react';
import './App.scss'
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  
  const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))

  return (
    <div className="App">
    <BrowserRouter>
      <div className="custom-body" style={{backgroundColor: 'white'}}>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path="/" name="home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>    
    </div>
  );
}

export default App;
