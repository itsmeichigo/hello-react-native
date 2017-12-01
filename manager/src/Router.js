import React, { Component } from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import { loggoutUser, checkAuth } from './actions';
import { Confirm } from './components/common'

class RouterComponent extends Component {
  state = { showModal: false, showLoading: false };

  componentDidMount() {
    this.props.checkAuth();
  }

  onLogout() {
    this.setState({ showModal: true });
  }

  onConfirmLogout() {
    this.setState({ showModal: false });
    this.props.loggoutUser();
  }

  onDeclineLogout() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router sceneStyle={{ paddingTop: 65 }}>
          <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Please Login" />
          </Scene>

          <Scene key="main" initial={this.props.loggedIn}>
            <Scene
              onRight={this.onLogout.bind(this)}
              rightTitle="Log Out"
              key="employeeList"
              component={EmployeeList}
              title="Employee"
              initial
            />
            <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
            <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
          </Scene>
        </Router>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onConfirmLogout.bind(this)}
          onDecline={this.onDeclineLogout.bind(this)}
        >
          Are you sure you want to log out?
        </Confirm>

      </View>
    );
  }
};

const mapStateToProps = state => {
  return { loggedIn: state.auth.user !== null };
};

export default connect(mapStateToProps, {
  loggoutUser,
  checkAuth,
})(RouterComponent);
