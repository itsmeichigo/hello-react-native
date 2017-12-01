import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { Button } from './common';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
  }

  onAddButtonPress() {
    Actions.employeeCreate();
  }

  keyExtractor(employee) {
    return employee.uid;
  }

  renderItem(employee) {
    return <ListItem employee={employee.item} />;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <FlatList
          data={this.props.employees}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      <View style={styles.footerStyle}>
          <Button onPress={this.onAddButtonPress.bind(this)}>
            Add New Employee
          </Button>
        </View>
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

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
