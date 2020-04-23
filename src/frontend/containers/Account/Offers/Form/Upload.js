import { connect } from 'react-redux';
import Upload from 'src/frontend/components/Account/Offers/Form/Upload';

import { setUploadData, offerUploadImage } from 'src/actions/offers';

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
