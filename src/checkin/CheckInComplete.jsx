import React from "react";
import { connect } from "react-redux";
import { Label, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import patientActions from '../patient/patientActions';
import CompletedScreenings from "../screening/CompletedScreenings";


class CheckInComplete extends React.Component {

  componentWillUnmount(){
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div>
        <Link to='/checkin/checkInTabs'>
          <Button bsSize='large' bsStyle='danger'>
            Back to Queue
          </Button>
        </Link>
        <h3><Label>Completed Screenings</Label></h3>
        <CompletedScreenings patientUuid={this.props.patient.uuid} />
        <h3><Label>Next steps</Label></h3>
{/*        <RequiredScreenings patientUuid={this.props.patient.uuid} />*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient
  };
};

export default connect(mapStateToProps)(CheckInComplete);
