import React from 'react';

import UploadDocumentModal from './UploadDocumentModal';
import AddUsersModal from './AddUsersModal';
import TermsConditionsModal from './TermsConditionsModal';

const MyModal = () => (
  <div className="modal-background d-none">
    <UploadDocumentModal/>
    <AddUsersModal/>
    <TermsConditionsModal/>
  </div>
);

export default MyModal;
