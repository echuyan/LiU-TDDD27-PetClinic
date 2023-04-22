import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
//import AuthService from './services/AuthService';
import Navbar from './components/common/Navbar';
//import Footer from './components/common/Footer';
//import Login from './components/auth/Login';
//import Ownerworkspace from './components/workspace/Ownerworkspace';
//import Doctorworkspace from './components/workspace/Doctorworkspace';
//import Adminworkspace from './components/workspace/Adminworkspace';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setRole(null);
  };

  const ProtectedOwnerRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser && role === 'owner' ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  const ProtectedDoctorRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser && role === 'doctor' ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser && role === 'admin' ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedOwnerRoute path="/owner" component={Ownerworkspace} />
        <ProtectedDoctorRoute path="/doctor" component={Doctorworkspace} />
        <ProtectedAdminRoute path="/admin" component={Adminworkspace} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;