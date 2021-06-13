import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import Result from "./components/Result/Result";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/result" render={(props) => <Result {...props} />} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
