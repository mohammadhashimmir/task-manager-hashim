import { useState, useContext } from "react";
import { TaskContext } from '../Components/Context/TaskContext';
import "../Styles/AddTask.css";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
function AddTasks() {
    const [taskTitle, settaskTitle] = useState("");
    const [taskDescription, settaskDescription] = useState("");
    const [titleError, setTitleError] = useState(false);

    const { onSaveTask, onModalClose } = useContext(TaskContext);

    //  form sumbit 
    const onFormSubmit = (e) => {
        e.preventDefault();
        const titleError = taskTitle === "";
        setTitleError(titleError);
        if (titleError) {
            return;
        }
        else {
            onSaveTask(taskTitle, taskDescription);
            onModalClose(false)
        }
    };
    // cross button click 
    const onCrossClick = () => {
        onModalClose(false)
    }
    // cancel button click 
    const onCancelClick = () => {
        onModalClose(false)

    }
    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>

                <div className="modal-card m1">
                    <header className="modal-card-head h1">
                        <p className="modal-card-title">Add Task</p>
                        <div className="close-icon" onClick={onCrossClick}><Icon path={mdiClose} size={1} />
                        </div>
                    </header>
                    <form onSubmit={onFormSubmit}>
                        <section className="modal-card-body b1">
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label is-small">Title</label>
                                        {titleError ? <p className="help is-danger">This field cannot be empty</p> : null}
                                        <input className="input"
                                            type="text"
                                            value={taskTitle}
                                            onChange={(e) => settaskTitle(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-small">Description</label>
                                    <textarea
                                        className="textarea"
                                        maxLength={100}
                                        value={taskDescription}
                                        onChange={(e) => settaskDescription(e.target.value)} />
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot f1">
                            <button className="button is-success" type="submit">Save Task</button>
                            <button type="button" className="button" onClick={onCancelClick}>Cancel</button>
                        </footer>
                    </form>
                </div>
            </div>
        </>

    )
};
export default AddTasks;