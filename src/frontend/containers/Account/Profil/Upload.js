import { connect } from 'react-redux';
import Upload from 'src/frontend/components/Account/Profil/Upload';

import { setUploadData, profilUploadImage, changeProfilInput } from 'src/actions/user';
import { showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({
  upload: state.offers.upload,
});

const mapDispatchToProps = (dispatch) => ({
  setUploadData: (name, value) => {
    dispatch(setUploadData(name, value));
  },
  profilUploadImage: () => {
    dispatch(profilUploadImage());
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
  changeProfilInput: (identifier, newValue) => {
    dispatch(changeProfilInput(identifier, newValue));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
