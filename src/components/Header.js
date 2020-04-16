import {AppBar, Button, fade, Menu, MenuItem, Tab, Tabs, Toolbar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useScrollTrigger from "@material-ui/core/es/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import logo from "../assets/logo.svg";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

let style = makeStyles(theme => ({
    spacing : {
        ...theme.mixins.toolbar,
        marginBottom : "3em"
    },
    logo : {
        height : "7em"
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
    }
}));

let Header = (props) => {
    let [value, setValue] = useState(0);
    let [anchor, setAnchor] = useState(null);
    let [open, setOpen] = useState(false);
    let [selected, setSelected] = useState(-1);
    let classes = style(props.theme);
    let handle = (e, val) => {
        setValue(val);
    };

    let handleClick = (e) => {
        setAnchor(e.currentTarget);
        setOpen(true);
    }

    let handleClose = (e) => {
        setAnchor(null);
        setOpen(false);
    }

    let handleChange = (e, value, tabs = -1) => {
        handleClose(e);
        setSelected(value);
        setValue(tabs);
    }

    useEffect(() => {
        switch (window.location.pathname) {
            case "/" : {
                setValue(0);
                break;
            }
            case "/services" : {
                setValue(1);
                break;
            }
            case "/about" : {
                setValue(2);
                break;
            }
            case "/revolution" : {
                setValue(3);
                break;
            }
            case "/contacts" : {
                setValue(4);
                break;
            }
            case "/estimate" : {
                setValue(5);
                break;
            }

            default : {
                break;
            }
        }
    },[value]);

    return(
    <>
        <HideOnScroll>
            <AppBar {...props}>
                <Toolbar disableGutters>
                    <Button component={Link} to={"/"} disableRipple className={classes.buttonLogo}>
                        <img src={logo} alt="company logo" className={classes.logo}/>
                    </Button>
                    <Tabs value={value} onChange={handle} className={classes.tabs} indicatorColor={"secondary"}>
                        <Tab label={"Home"} component={Link} to={"/"}>Home</Tab>
                        <Tab label={"Services"}
                             aria-controls={open ? 'menu' : undefined}
                             aria-owns={anchor ? "menu" : undefined}
                             aria-haspopup={anchor ? "true" : undefined}
                             onMouseOver={handleClick}
                        />
                        <Tab label={"About us"} component={Link} to={"/about"}>About us</Tab>
                        <Tab label={"Revolution"} component={Link} to={"/revolution"}>The revolution</Tab>
                        <Tab label={"Contacts"} component={Link} to={"/contacts"}>Contact us</Tab>
                    </Tabs>
                    <Button color={"secondary"} variant={"contained"} className={classes.estimate} component={Link} to={"/estimate"}>Free Estimate</Button>
                    <Menu open={open} id={"menu"}
                          anchorEl={anchor} onClose={handleClose}
                          autoFocusItem={open} MenuListProps={{onMouseLeave : handleClose}}
                          classes={{paper : classes.menu, list : classes.menuList}}
                          elevation={2}
                    >
                        <MenuItem component={Link} to={"/services"} onClick={(e) => {
                            handleChange(e, 0, 1);
                        }} classes={{selected : classes.selected}} selected={selected === 0}>Services</MenuItem>
                        <MenuItem component={Link} to={"/web"} onClick={(e) => {
                            handleChange(e, 1);
                        }} classes={{selected : classes.selected}} selected={selected === 1}>Web site development</MenuItem>
                        <MenuItem component={Link} to={"/desktop"} onClick={(e) => {
                            handleChange(e, 2);
                        }} classes={{selected : classes.selected}} selected={selected === 2}>Desktop software development</MenuItem>
                        <MenuItem component={Link} to={"/mobile"} onClick={(e) => {
                            handleChange(e, 3);
                        }} classes={{selected : classes.selected}} selected={selected === 3}>Mobile development</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
        <div className={classes.spacing}/>
    </>
    )};

export default Header;