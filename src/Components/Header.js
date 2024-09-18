import { useState, useRef, useEffect, useContext } from "react";
import "../Styles/Header.css"
import { TaskContext } from '../Components/Context/TaskContext';
import SearchTasks from "./SearchTasks";
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';

function Header() {
    const [openDropdrown, setOpenDropDown] = useState(false);
    const dropdownRef = useRef(null);
    const { selectedFilter, getFilterType } = useContext(TaskContext);

    // closing Dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (!dropdownRef.current.contains(event.target)) {
                setOpenDropDown(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // event Delegation to get Filter Type 
    function dropdownContent(e) {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            getFilterType(target.textContent);
            setOpenDropDown(false);
        }
    };

    return (
        <nav className="navbar is-responsive is transparent n1">
            <div className="navbar-start">
                <div className="navbar-item">
                    <p><span className="is-size-5 head-logo">Task Keeper</span></p>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item" ref={dropdownRef}>
                    <div className={!openDropdrown ? "dropdown" : "dropdown is-active"}>
                        <div className="dropdown-trigger">
                            <button className="button dropdown" onClick={() => { setOpenDropDown(!openDropdrown) }}>
                                <span>Filter Tasks  ({selectedFilter})</span>
                                <span className="icon is-small">
                                    <Icon path={mdiChevronDown} size={0.8} />
                                </span>
                            </button>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-content" onClick={dropdownContent}>
                                <div className="dropdown-item">All</div>
                                <div className="dropdown-item">Active</div>
                                <div className="dropdown-item">Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-item">
                    <SearchTasks />
                </div>
            </div>
        </nav>

    )
};
export default Header;

