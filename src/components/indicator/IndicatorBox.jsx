import Number from "../common/Number";

const IndicatorBox = ({name, value}) => {
    return(
        <div>
            <span style={{marginRight:"5px"}}><strong>{name}:</strong></span>
            <Number number={value}/>
        </div>
    )
};

export default IndicatorBox;