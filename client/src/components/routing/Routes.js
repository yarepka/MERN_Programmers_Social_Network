import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Dashboard from '../dashboard/Dashboard';
import AddEducation from '../profile-forms/AddEducations';
import AddExperience from '../profile-forms/AddExperience';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/add-education' component={AddEducation} />
        <Route exact path='/add-experience' component={AddExperience} />
        <Route exact path='/create-profile' component={CreateProfile} />
        <Route exact path='/edit-profile' component={EditProfile} />
        {/* <Route exact path='/posts' component={Posts} />
        <Route exact path='/posts/:id' component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
