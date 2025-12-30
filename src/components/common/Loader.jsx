import loaderImg from '../../assets/bluebottle-loader.gif';
const Loader = () => {
    return(
        <div style={{position:'fixed',top:'0px',left:'0px',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"rgba(0,0,0,0.5)"}}>
            <img src={loaderImg} width={500} style={{borderRadius:'16px',boxShadow:'0 4px 6px rgba(0,0,0,0.1)'}}/>
        </div>
    )
};

export default Loader