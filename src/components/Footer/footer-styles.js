import {makeStyles} from "@material-ui/styles";

let style = makeStyles((theme) => ({
    footer : {
        display : "flex",
        justifyContent : "flex-start",
        background : "linear-gradient(49deg," + theme.palette.primary.main + " 0%, " + theme.palette.primary.light + " 100%)"
    },

    adornment : {
        height : "12em",
    },

    link_wrapper: {
        position : "absolute",
        height : "12em",
        margin : "auto",
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
}));

export default style;