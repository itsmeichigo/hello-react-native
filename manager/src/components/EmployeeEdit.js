import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { text } from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = {
    showModal: false,
    saveEnabled: false,
  };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  componentWillReceiveProps(newProps) {
    const { name, phone, shift } = this.props.employee;
    const {
      name: newName,
      phone: newPhone,
      shift: newShift
    } = newProps;

    const saveEnabled = newName !== name || newPhone !== phone || newShift !== shift;
    this.setState({ saveEnabled });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    text(phone, `Your upcoming shift is ${shift}`);
  }

  onConfirmFiring() {
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }

  onDeclineFiring() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button
            disabled={!this.state.saveEnabled}
            onPress={this.onButtonPress.bind(this)}
          >
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: true })}
          >
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onConfirmFiring.bind(this)}
          onDecline={this.onDeclineFiring.bind(this)}
        >
          Are you sure you want to fire this employee?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete,
})(EmployeeEdit);
