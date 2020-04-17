import {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    SwipeableDrawer,
    Tab,
    Tabs,
    Toolbar,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useScrollTrigger from "@material-ui/core/es/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import logo from "../assets/logo.svg";
import style from "./header-style";
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
    let [openMenu, setOpenMenu] = useState(false);
    let [openDrawer, setOpenDrawer] = useState(false);
    let [selected, setSelected] = useState(-1);

    let handle = (e, val) => {
        setValue(val);
    };

    let handleClick = (e) => {
        setAnchor(e.currentTarget);
        setOpenMenu(true);
    }

    let handleClose = (e) => {
        setAnchor(null);
        setOpenMenu(false);
    }

    let handleChange = (e, value, tabs = -1) => {
        handleClose(e);
        setSelected(value);
        setValue(tabs);
    }

    let toggleDrawer = (e) => {
        setOpenDrawer(!openDrawer);
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
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

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
                     aria-controls={openMenu ? 'menu' : undefined}
                     aria-owns={anchor ? "menu" : undefined}
                     aria-haspopup={anchor ? "true" : undefined}
                     onMouseOver={handleClick}
                />
                <Tab label={"About us"} component={Link} to={"/about"}>About us</Tab>
                <Tab label={"Revolution"} component={Link} to={"/revolution"}>The revolution</Tab>
                <Tab label={"Contacts"} component={Link} to={"/contacts"}>Contact us</Tab>
            </Tabs>
            <Button color={"secondary"} variant={"contained"} className={classes.estimate} component={Link} to={"/estimate"}>Free Estimate</Button>
            <Menu open={openMenu} id={"menu"}
                  anchorEl={anchor} onClose={handleClose}
                  autoFocusItem={openMenu} MenuListProps={{onMouseLeave : handleClose}}
                  classes={{paper : classes.menu, list : classes.menuList}}
                  elevation={2}
            >
                {menuOptions}
            </Menu>
        </>
    );

    let drawer = (
        <div className={classes.drawerWrapper}>
            <SwipeableDrawer variant={"persistent"} onClose={toggleDrawer} onOpen={toggleDrawer} open={openDrawer} disableBackdropTransition={!iOS} disableDiscovery={iOS} anchor={"right"}>
                <IconButton>
                    <CloseIcon onClick={toggleDrawer}/>
                </IconButton>
            </SwipeableDrawer>
            <IconButton onClick={toggleDrawer} size={"medium"} disableRipple>
                <MenuIcon className={classes.icon} style={{ fontSize: "1.5em" }}/>
            </IconButton>
        </div>
    );

    return(
    <>
        <HideOnScroll>
            <AppBar {...props}>
                <Toolbar disableGutters>
                    <Button component={Link} to={"/"} disableRipple className={classes.buttonLogo}>
                        <img src={logo} alt="company logo" className={classes.logo}/>
                    </Button>
                    {matches ? drawer : ResponsiveTabs}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
        <div className={classes.spacing}/>
    </>
    )};

export default Header;