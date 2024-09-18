import { useContext } from "react";
import "../Styles/SearchTasks.css";
import { TaskContext } from '../Components/Context/TaskContext';

function SearchTasks() {
    const { searchTerm, getSearchTerm } = useContext(TaskContext);

    const onSearchTermChange = (e) => {
        getSearchTerm(e.target.value)
    };
    return (
        <div className="is-pulled-right">
            <div className="field has-addons">
                <div className="control">
                    <input className="input i1" type="text"
                        value={searchTerm}
                        placeholder="Find Tasks"
                        onChange={onSearchTermChange}
                    />
                </div>
            </div>
        </div>
    )
};
export default SearchTasks;