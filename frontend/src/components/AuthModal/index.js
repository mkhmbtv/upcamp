import { useState } from "react";
import { Modal } from '../../context/Modal';
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

const AuthModal = ({ modal }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginModal = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleSignupModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const openModal = () => {
    return modal === 'login' 
      ? setShowLoginModal(true)
      : setShowSignupModal(true);
  };

  return (
    <>
      <button onClick={openModal}>
        {modal === 'login' ? 'Log In' : 'Sign Up'}
      </button>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClick={handleSignupModal} />
        </Modal>
      )}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm onClick={handleLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default AuthModal;