import {makeStyles} from "@material-ui/styles";

let style = makeStyles((theme) => ({
    footer : {
        display : "flex",
        justifyContent : "flex-start",
        background : "linear-gradient(49deg," + theme.palette.primary.main + " 0%, " + theme.palette.primary.light + " 100%)"
    },

    adornment : {
        height : "12em",
        [theme.breakpoints.down("sm")] : {
            height : "8em"
        },
        [theme.breakpoints.down("xs")] : {
            height : "6em"
        },
    },

    link_wrapper: {
        position : "absolute",
        height : "12em",
        [theme.breakpoints.down("sm")] : {
            height : "8em"
        },
        [theme.breakpoints.down("xs")] : {
            height : "6em"
        },
        margin : "auto",
        width : "100vw"
    },

    link_item : {
        display : "block",
        textDecoration : "none",
        color : "white",
        textTransform : "uppercase",
        fontWeight : "bold",
        marginBottom : "1em"
    },

    link_column : {
        justifyContent : "flex-start"
    },

    social_icon : {
        color : "white",
        fontSize : "5em",
        [theme.breakpoints.down("sm")] : {
            fontSize : "4em"
        },
        [theme.breakpoints.down("xs")] : {
            fontSize : "2.5em"
        },
    }
}));

export default style;