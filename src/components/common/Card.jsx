const Card = ({children, style={}}) => {
    return (
        <div style={{...style,backgroundColor:'#ffffff',borderRadius:'16px',boxShadow:'0 4px 6px rgba(0,0,0,0.1)',padding:'24px'}}>
            {children}
        </div>
    )
}

export default Card;