import { Switch, Route } from "react-router-dom";

import Signup from "./pages/Signup"

const Dashboard = () => <div>Dashboard</div>;
const Login = () => <div>Login</div>;



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
