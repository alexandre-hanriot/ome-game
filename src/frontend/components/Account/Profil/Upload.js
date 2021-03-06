/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'src/frontend/components/Loader';

const Upload = ({
  upload,
  setUploadData,
  profilUploadImage,
  displayModal,
  changeProfilInput,
}) => {
  useEffect(() => {
    if (upload.status === 2) {
      changeProfilInput('picture', upload.uploadedFile);
      displayModal();
    }
  }, [upload.uploadedFile]);

  useEffect(() => () => {
    setUploadData('file', '');
    setUploadData('filename', '');
    setUploadData('uploadedFile', {});
    setUploadData('status', 0);
    setUploadData('uploadPercentage', 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    profilUploadImage();
    setUploadData('status', 1);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (typeof file !== 'undefined') {
      setUploadData('file', file);
      setUploadData('filename', file.name);
    }
  };

  return (
    <div className="account-profil-upload">
      <h1>Envoyer une image</h1>
      {upload.status === 3 && <p className="account-profil-upload__error">Erreur lors de l'envoi</p>}
      <form>
        <div>
          <input className="account-profil-upload__file" type="file" onChange={handleChange} />
        </div>

        <div className="account-profil-upload__progress">
          <div className="account-profil-upload__progress__text">{upload.uploadPercentage}%</div>
          <div className="account-profil-upload__progress__bar" style={{ width: `${upload.uploadPercentage}%` }} />
        </div>

        {upload.status !== 1 && <button className="global-button" type="submit" onClick={handleSubmit}>Envoyer</button>}
        {upload.status === 1 && <button className="global-button" type="button" onClick={handleSubmit} disabled><Loader withMargin={false} /></button>}
      </form>
    </div>
  );
};

Upload.propTypes = {
  setUploadData: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired,
  profilUploadImage: PropTypes.func.isRequired,
  displayModal: PropTypes.func.isRequired,
  changeProfilInput: PropTypes.func.isRequired,
};

export default Upload;
