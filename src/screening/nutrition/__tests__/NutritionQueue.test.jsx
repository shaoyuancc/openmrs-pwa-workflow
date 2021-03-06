import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid, visitActions } from '@openmrs/react-components';
import NutritionQueue from '../NutritionQueue';
import patientActions from '../../../patient/patientActions';
import {ENCOUNTER_REPRESENTATION, PATIENT_REPRESENTATION, VISIT_REPRESENTATION} from "../../../constants";

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const nutritionQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <NutritionQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: NutritionQueue', () => {
  beforeEach(() => {
    props = {
      session: {
        sessionLocation: {
          uuid: 'abc'
        }
      }};
    store = mockStore(
      {
        dispatch: {},
        openmrs: {
          session: {
            sessionLocation: {
              uuid: 'abc'
            }
          }
        },
        patients: []
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nutritionQueue())).toMatchSnapshot();
    expect(nutritionQueue().find(DataGrid).length).toBe(1);
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/screening/nutrition/form");
    expect(store.getActions()).toContainEqual(patientActions.clearPatientSelected());
    expect(store.getActions()).toContainEqual(visitActions.fetchActiveVisits("custom:" + VISIT_REPRESENTATION, props.session.sessionLocation.uuid));
  });

});
