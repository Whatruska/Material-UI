import {AppBar, Button, fade, Menu, MenuItem, Tab, Tabs, Toolbar, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useScrollTrigger from "@material-ui/core/es/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import logo from "../assets/logo.svg";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

let HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

let Header = (props) => {
    let [value, setValue] = useState(-1);
    let [anchor, setAnchor] = useState(null);
    let [open, setOpen] = useState(false);
    let [selected, setSelected] = useState(-1);

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
                setSelected(-1);
                break;
            }
            case "/services" : {
                setValue(1);
                setSelected(-1);
                break;
            }
            case "/about" : {
                setValue(2);
                setSelected(-1);
                break;
            }
            case "/revolution" : {
                setValue(3);
                setSelected(-1);
                break;
            }
            case "/contacts" : {
                setValue(4);
                setSelected(-1);
                break;
            }
            case "/estimate" : {
                setValue(5);
                setSelected(-1);
                break;
            }

            default : {
                break;
            }
        }
    },[value]);

    let theme = useTheme();
    let matches = useMediaQuery(theme.breakpoints.down("md"));

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
        }
    }));

    let classes = style(props.theme);

    let options = [
        {services : "Services"},
        {web : "Web site development"},
        {desktop : "Desktop software development"},
        {mobile : "Mobile development"}
    ];

    let menuOptions = options.map((option, index) => {
        let key = Object.keys(option).pop();
        let value = option[key];
        return (
            <MenuItem component={Link} to={"/" + key}
                      onClick={(e) => {
                          if (index !== 0){
                              handleChange(e, index)
                          } else {
                              handleChange(e, index, 1)
                          }
                      }}
                      classes={{selected : classes.selected}} selected={selected === index}
            >{value}</MenuItem>
        );
    });

    let ResponsiveTabs = (
        <>
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
                {menuOptions}
            </Menu>
        </>
    );

    return(
    <>
        <HideOnScroll>
            <AppBar {...props}>
                <Toolbar disableGutters>
                    <Button component={Link} to={"/"} disableRipple className={classes.buttonLogo}>
                        <img src={logo} alt="company logo" className={classes.logo}/>
                    </Button>
                    {matches ? null : ResponsiveTabs}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
        <div className={classes.spacing}/>
    </>
    )};

export default Header;