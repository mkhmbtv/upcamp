import SpotReviewForm from './SpotReviewForm';
import { Modal } from '../../context/Modal';
import { useState } from 'react';

const SpotReviewFormModal = ({ spotId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='btn btn--min' onClick={() => setShowModal(true)}>Leave a review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotReviewForm spotId={spotId} handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  )
};

export default SpotReviewFormModal;

