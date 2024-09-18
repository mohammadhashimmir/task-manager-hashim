import "../Styles/DeleteModal.css";
import { TaskContext } from '../Components/Context/TaskContext';
import { useContext } from "react";

function DeleteModal({ taskId, cancelDel }) {
    const { onDelete } = useContext(TaskContext);
    // delete Confirmation 
    const onConfirmClick = () => {
        onDelete(taskId);
    };
    // delete Cancel 
    const onDeleteCancelClick = () => {
        cancelDel(false)
    };
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card is-responsive m3">
                <header className="modal-card-head">
                    <p className="modal-card-title">Confirm Deletion</p>
                </header>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={onConfirmClick}>Confirm</button>
                    <button className="button" onClick={onDeleteCancelClick}>Cancel</button>
                </footer>
            </div>
        </div>
    )
};
export default DeleteModal;