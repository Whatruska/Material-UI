import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default createMuiTheme({
    palette : {
        primary : {
            main : 'rgba(153,19,212,1)',
            light : "rgba(237,163,241,1)"
        },
        secondary : {
            main : '#e7a61a'
        }
    },

    typography : {
        h6 : {
            fontWeight : 300
        }
    }
});