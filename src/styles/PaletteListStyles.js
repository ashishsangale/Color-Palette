import sizes from './Sizes';
import background from './background.svg'
export default {
    root:{
        backgroundColor: '#000000',
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${background})`,
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
        flexWrap: "wrap",
        [sizes.down("xl")]: {
        width: "50%"
        },
        [sizes.down("xs")]: {
        width: "75%"
        } 
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
        gridGap: "2.5rem",
        [sizes.down("md")]: {
        gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
        gridTemplateColumns: "repeat(1, 100%)",
        gridGap: "1rem"
        }
    }
}