import {makeStyles} from "@material-ui/styles";
import {fade} from "@material-ui/core";

let style = makeStyles(theme => ({
    spacing : {
        ...theme.mixins.toolbar,
        marginBottom : "3.2em",
        [theme.breakpoints.down("md")] : {
            marginBottom : "2.2em"
        },
        [theme.breakpoints.down("sm")] : {
            marginBottom : "1.7em"
        },
        [theme.breakpoints.down("xs")] : {
            marginBottom : "1.2em"
        }
    },
    logo : {
        height : "7em",
        [theme.breakpoints.down("md")] : {
            height : "6em"
        },
        [theme.breakpoints.down("sm")] : {
            height : "5.5em"
        },
        [theme.breakpoints.down("xs")] : {
            height : "5em"
        }
    },
    tabs : {
        marginLeft : "auto"
    },
    estimate : {
        marginRight : "25px",
        marginLeft : "50px",
        color : "white",
        borderRadius : "20px",
        "&:hover" : {
            backgroundColor : theme.palette.secondary.light
        }
    },
    buttonLogo : {
        padding : "0px 0px",
        "&:hover" : {
            background : "transparent"
        }
    },
    menu : {
        backgroundColor : fade(theme.palette.primary.light, 0.7),
        color : "white",
        borderRadius : "20px"
    },
    menuList : {

    },
    menuItem : {
        "&:hover" : {
            backgroundColor : fade(theme.palette.primary.light, 1)
        }
    },

    selected : {
        backgroundColor : fade(theme.palette.primary.light, 1.5)
    },

    drawerWrapper : {
        marginLeft : "auto",
        marginRight : "2em"
    },

    icon : {
        color : "white"
    }
}));

export default style;