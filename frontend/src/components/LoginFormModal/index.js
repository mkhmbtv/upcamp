import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { useAuth } from "../../context/AuthModal";

const LoginFormModal = () => {
  const { showLoginForm, setShowLoginForm } = useAuth();

  return (
    <>
      <button className='btn' onClick={() => setShowLoginForm(true)}>Login</button>
      {showLoginForm && (
        <Modal onClose={() => setShowLoginForm(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
};

export default LoginFormModal;