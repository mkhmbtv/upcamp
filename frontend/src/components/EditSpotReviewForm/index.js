import EditSpotReviewForm from './EditSpotReviewForm';
import { Modal } from '../../context/Modal';
import { useState } from 'react';

const EditSpotReviewFormModal = ({ review }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='btn bookingForm__btn btn--small' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotReviewForm review={review} handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  )
};

export default EditSpotReviewFormModal;