import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch, loggoutUser } from '../actions';
import ListItem from './ListItem';
import { Button, Confirm } from './common';

class EmployeeList extends Component {
  state = { showModal: false };

  componentWillMount() {
    this.props.employeesFetch();
  }

  onLogoutButtonPress() {
    this.setState({ showModal: true });
  }

  onConfirmLogout() {
    this.setState({ showModal: false });
    this.props.loggoutUser();
  }

  onDeclineLogout() {
    this.setState({ showModal: false });
  }

  keyExtractor(employee) {
    return employee.uid;
  }

  renderItem(employee) {
    return <ListItem employee={employee.item} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.containerStyle}>
          <FlatList
            data={this.props.employees}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
          <View style={styles.footerStyle}>
            <Button onPress={this.onLogoutButtonPress.bind(this)}>
              Log Out
            </Button>
          </View>
        </View>
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
}

const styles = {
  containerStyle: {
    flex: 1,
    alignContent: 'space-between',
  },
  footerStyle: {
    height: 44,
    marginBottom: 10,
    marginTop: 10,
  },
};

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return { employees };
};

export default connect(mapStateToProps, {
  employeesFetch,
  loggoutUser
})(EmployeeList);
