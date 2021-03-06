import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { employeeUpdate, employeeCreate, employeeFormClear } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  state = { saveEnabled: false };

  componentWillMount() {
    this.props.employeeFormClear();
  }

  componentWillReceiveProps(newProps) {
    const { name, phone, shift } = newProps;
    const defined = name && phone && shift;
    if (defined) {
      const notEmpty = name.length > 0 && phone.length > 0 && shift.length > 0;
      this.setState({ saveEnabled: notEmpty });
    } else {
      this.setState({ saveEnabled: false });
    }
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
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
            Create
          </Button>
        </CardSection>
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
  employeeCreate,
  employeeFormClear,
})(EmployeeCreate);
