import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./component/SignUp";
import SignIn from "./component/SignIn";
import Todo from "./component/Todo";
import Home from "./component/Home/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={Home} />
        <Route path="/todo" component={Todo} />
      </Switch>
    </Router>
  );
};

export default App;
