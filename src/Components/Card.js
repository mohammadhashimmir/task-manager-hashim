import { useContext, useState } from 'react';
import DeleteModal from './DeleteModal';
import "../Styles/Card.css";
import Icon from '@mdi/react';
import { mdiDelete, mdiCheck, mdiCheckAll } from '@mdi/js';
import { TaskContext } from '../Components/Context/TaskContext';

function Card({ task, toggleEditFn }) {
    const [deleteMod, setDeleteMod] = useState(false);
    const { markTask, unmarkTask } = useContext(TaskContext);

    // Toggle Edit Modal 
    const onCardBodyClick = () => {
        toggleEditFn(true)
    };
    // Delete button Click 
    const onDeleteClick = () => {
        setDeleteMod(!deleteMod);
    };
    // cancel Delete Callback 
    const onCancelDelClick = (val) => {
        setDeleteMod(val)

    };
    // checkbox change
    const onTickClick = () => {
        markTask(task.id)
    }
    const onDoubleTickClick = () => {
        unmarkTask(task.id)
    }

    return (
        <>
            <div className="column is-3">
                <div className="card">

                    <header className="card-header" >
                        <p className="card-header-title">{task.title}</p>
                        <div className='buttons cardButtons'>
                            <button className="button"
                                onClick={() => task.completed ? onDoubleTickClick(task.id) : onTickClick(task.id)}>
                                <span className={`icon-wrapper ${task.completed ? 'checked' : 'unchecked'}`}>
                                    <Icon path={task.completed ? mdiCheckAll : mdiCheck} size={0.8} />
                                </span>
                            </button>
                            <button className="button"
                                onClick={onDeleteClick}>
                                <Icon path={mdiDelete} size={0.8} />
                            </button>
                        </div>

                    </header>

                    <div className="card-content" onClick={onCardBodyClick} title="Edit/View Task">
                        <span className="is-family-code is-size-7">Created:{task.dateTimeCreated}</span>
                        <p className="is-family-code is-size-7">Status:<b>{task.completed ? "Completed" : "Active"}</b></p>
                        <p className={task.checked ? 'title is-6 title-line-through' : 'title is-6'}>{task.tagline}</p>
                        <div className="content">{task.description}</div>
                    </div>
                </div>
            </div>

            {deleteMod ? <DeleteModal taskId={task.id} cancelDel={onCancelDelClick} /> : null}
        </>
    )
};
export default Card;