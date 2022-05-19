import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthorsTable from './components/AuthorsTable';
import AuthorForm from './components/AuthorsForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Favorite Authors</h1>
        <Switch>
          <Route exact path="/new">
            <AuthorForm/>
          </Route>
          <Route path="/edit/:id">
            <AuthorForm/>
          </Route>
          <Route path="/">
            <AuthorsTable/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
