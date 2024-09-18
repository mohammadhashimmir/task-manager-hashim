import { PropagateLoader } from "react-spinners";
function Loader() {
    return (
        <div className="has-text-centered">
            <PropagateLoader size={10} />
        </div>
    )
};
export default Loader;