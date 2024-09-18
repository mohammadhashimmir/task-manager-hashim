import { useContext, useState } from "react";
import "../Styles/EditModal.css";
import { TaskContext } from '../Components/Context/TaskContext';

function EditModal({ task, toggleEditFn }) {
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [EditTitleError, setEditTitleError] = useState(false);
    const { onSaveEdit } = useContext(TaskContext);

    // edit form Submit
    const onFormSubmit = (e) => {
        e.preventDefault();
        const EditTitleError = editedTitle === "";
        setEditTitleError(EditTitleError);
        if (EditTitleError) {
            return;
        } else {
            onSaveEdit(task.id, editedTitle, editDescription);
            toggleEditFn(false);
        }
    }
    // edit modal cancel 
    const onEditCancelClick = () => {
        toggleEditFn(false);
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card m2">
                <form onSubmit={onFormSubmit}>
                    <section className="modal-card-body b2">
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <label className="label is-small">Title</label>
                                    {EditTitleError ? <p className="help is-danger">This field cannot be empty</p> : null}
                                    <input className="input"
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="label is-small">Description</label>
                                <textarea
                                    className="textarea"
                                    maxLength={100}
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="buttons editButtonSection">
                            <button className="button is-success" type="submit">Update Task</button>
                            <button type="button" className="button" onClick={onEditCancelClick}>Cancel</button>
                        </div>

                    </section>3
                </form>
            </div>

        </div>


    )
};
export default EditModal;