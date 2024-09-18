import { useContext } from "react";
import "../Styles/ErrorModal.css"
import { TaskContext } from '../Components/Context/TaskContext';
function ErrorModal() {
  const { error, closeError } = useContext(TaskContext);

  // Dismiss
  const onDismissClick = () => {
    closeError(false);
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card m4">
        <section className="modal-card-body">
          <p className="title is-4 has-text-danger">{error}</p>
          <button className="button is-success" onClick={onDismissClick}>Dismiss</button>
        </section>
      </div>
    </div>
  )
};
export default ErrorModal;