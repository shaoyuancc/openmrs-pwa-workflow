import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { AuthenticatedRoute, HeaderAlt } from '@openmrs/react-components';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import LeftRail from './LeftRail';
import PatientHeader from '../patient/PatientHeader';
import logo from "../assets/images/pih_apzu_logo_white.png";
import { NAV_MENU_PAGES, USER_MENU_PAGES} from '../constants';
import '../assets/css/header.css';

// TODO extract authenicated route out to a higher level?
// TODO can we pass the patient into the Header as well, so it can be non-connected?

const Layout = props => {

  const contentCols = props.patient.uuid ? 10 : 12;

  return (
    <div id="outer-container" className="ag-theme-material">
      <ReduxToastr />
      <Grid fluid={true}>
        <Row style={{marginBottom:60}}>
            <HeaderAlt
              className="HeaderAlt"
              logo={logo}
              userMenuPages={USER_MENU_PAGES}
              navMenuPages={NAV_MENU_PAGES}
            />
        </Row>
        <Row>
          <PatientHeader />
        </Row>
        <Row>
          {props.patient.uuid &&
            <Col xs={2} sm={2} md={2} lg={2}>
              <LeftRail patient={props.patient} />
            </Col>
          }
          <Col xs={contentCols} sm={contentCols} md={contentCols} lg={contentCols}>
            <AuthenticatedRoute {...props} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient
  };
};

export default connect(mapStateToProps)(Layout);

