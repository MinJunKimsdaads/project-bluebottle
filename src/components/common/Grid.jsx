const Grid = ({children}) => {
    return(
        <div style={{display:'grid',gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',gap: '24px',marginBottom: '24px',}}>
            {children}
        </div>
    )
} 

export default Grid;