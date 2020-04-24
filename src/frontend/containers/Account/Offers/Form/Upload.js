import { connect } from 'react-redux';
import Upload from 'src/frontend/components/Account/Offers/Form/Upload';

import { setUploadData, offerUploadImage, handleFormInput } from 'src/actions/offers';
import { showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({
  upload: state.offers.upload,
});

const mapDispatchToProps = (dispatch) => ({
  setUploadData: (name, value) => {
    dispatch(setUploadData(name, value));
  },
  offerUploadImage: () => {
    dispatch(offerUploadImage());
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
  handleFormInput: (identifier, newValue) => {
    dispatch(handleFormInput(identifier, newValue));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
