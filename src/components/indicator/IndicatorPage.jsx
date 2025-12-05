import Nasdaq from "./Nasdaq.jsx";
import DolarIndex from "./DolarIndex.jsx";
import Futures from "./Futrues.jsx";

const IndicatorPage = () => {
    return(
        <div>
            <Nasdaq />
            <DolarIndex />
            <Futures />
        </div>
    )
}

export default IndicatorPage;