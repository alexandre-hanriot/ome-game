import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Upload = ({ upload, setUploadData, offerUploadImage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    offerUploadImage();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (typeof file !== 'undefined') {
      setUploadData('file', file);
      setUploadData('filename', file.name);
    }
  };

  return (
    <div className="account-offers-upload">
      <h1>Envoyer une image</h1>
      {upload.message ? `<p>Message : ${upload.message}</p>` : ''}
      <form>
        <div className="custom-file mb-4">
          <input className="account-offers-upload__file" type="file" onChange={handleChange} />
          {/* <label className="custom-file-label" htmlFor="customFile">
            {upload.filename}
          </label> */}
        </div>

        <div className="account-offers-upload__progress">
          <div className="account-offers-upload__progress__text">{upload.uploadPercentage}%</div>
          <div className="account-offers-upload__progress__bar" style={{ width: `${upload.uploadPercentage}%` }} />
        </div>

        <button className="global-button" type="submit" onClick={handleSubmit}>Envoyer</button>
      </form>
    </div>
  );
};

Upload.propTypes = {
  setUploadData: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired,
  offerUploadImage: PropTypes.func.isRequired,
};

export default Upload;
