import { useState } from "react";
import EditBookingForm from "./EditBookingForm";
import { Modal } from "../../context/Modal";

const EditBookingFormModal = ({ booking }) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button className='btn bookingForm__btn btn--small' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBookingForm booking={booking} handleClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  )
};

export default EditBookingFormModal;