import { useState } from "react";
import Card from "./Card";
import EditModal from "./EditModal";

function ToDisplay({task}) {
    const [toggleEdit, setToggleEdit] = useState(false);
    
    // toggle edit field visibility 
    const toggleEditFn = (val) => {
        setToggleEdit(val)
    }

    return (
        <>
            {toggleEdit ? <EditModal task={task} toggleEditFn={toggleEditFn} /> : null}
            <Card task={task} toggleEditFn={toggleEditFn}/>
        </>
    )
};

export default ToDisplay;