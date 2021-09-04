import { Switch, Route } from "react-router-dom";

import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} /> 
        <Route path="/reset-password" component={ResetPassword} />        
      </Switch>
    </div>
  );
}

export default App;
