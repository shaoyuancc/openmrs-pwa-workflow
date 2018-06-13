import Queue from '../../queue/Queue';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

class BloodPressureQueue extends Queue {

  redirectToInfoPageActionCreator() {
    return push('/screening/bloodPresssure/form');
  }

}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.screening.bloodPressureQueue.list
  };
};

export default connect(mapStateToProps)(BloodPressureQueue);
