const Number = ({number, isChange=true}) => {
    return(
        <>
            {number === null ? (
                <span style={{fontSize: '18px',fontWeight: 'bold'}}>정보없음</span>
            ) : (
                <span style={{fontSize: '18px',fontWeight: 'bold',color: (number > 0 && number) ? '#2C5F7C' : '#EF5350'}}>{number}{isChange ? '%':''}</span>
            )}
        </>
    )
}

export default Number;