import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Result from "./components/Result/Result";

function App() {
  return (
    <Switch>
      <Route path="/result" render={(props) => <Result {...props} />} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

export default App;
