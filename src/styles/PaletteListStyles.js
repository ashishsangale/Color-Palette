export default {
    root:{
        backgroundColor: '#282c34',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll'
    },
    container:{
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap' 
    },
    nav:{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: '#61dafb',
        alignItems: 'center',
        '& a': {
            color: '#61dafb'
        }
    },
    palettes:{
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,33%)',
        gridGap: '5px'
    }
}