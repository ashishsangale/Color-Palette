
export default {
    Navbar:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '7vh',
    },
    logo:{
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '20px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#282c34',
    },
    slider:{
        width: '350px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track':{
            background: 'transparent'
        },
        '& .rc-slider-rail':{
            height: '5px'
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus':{
            backgroundColor: 'green',
            outline: 'none',
            boxShadow: 'none',
            height: '15px',
            width: '15px',
            border: '2px solid greenyellow',
            marginLeft: '-4px',
            marginTop: '-4px',
        } 
    },
    select:{
        marginLeft: 'auto',
        marginRight: '1rem'
    },
    a:{
        textDecoration: 'none',
        color: '#61dafb',
    }
}