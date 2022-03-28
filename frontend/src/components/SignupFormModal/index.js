import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";
import { useAuth } from "../../context/AuthModal";

const SignupFormModal = () => {
  const { showSignupForm, setShowSignupForm } = useAuth();

  return (
    <>
      <button className='btn' onClick={() => setShowSignupForm(true)}>Sign Up</button>
      {showSignupForm && (
        <Modal onClose={() => setShowSignupForm(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  )
};

export default SignupFormModal;