import { useState } from "react";
import EditBookingForm from "./EditBookingForm";
import { Modal } from "../../context/Modal";

const EditBookingFormModal = ({ booking, spot }) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button className='btn bookingForm__btn btn--small' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBookingForm booking={booking} spot={spot} handleClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  )
};

export default EditBookingFormModal;