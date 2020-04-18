import {
    AppBar,
    Button,
    IconButton, List, ListItem, ListItemIcon, ListItemText,
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
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ContactsIcon from '@material-ui/icons/Contacts';
import LanguageIcon from '@material-ui/icons/Language';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';

import logo from "../../assets/logo.svg";
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
    let [anchor, setAnchor] = useState(null);
    let [openMenu, setOpenMenu] = useState(false);
    let [openDrawer, setOpenDrawer] = useState(false);

    let value = props.value;
    let setValue = props.setValue;
    let selectedTabOption = props.selectedTabOption;
    let setSelectedTabOption = props.setSelectedTabOption;
    let selectedDrawerOption = props.selectedDrawerOption;
    let setSelectedDrawerOption = props.setSelectedDrawerOption;

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
        setSelectedTabOption(value);
        setValue(tabs);
    }

    let toggleDrawer = (e) => {
        setOpenDrawer(!openDrawer);
    }

    useEffect(() => {
        switch (window.location.pathname) {
            case "/" : {
                setValue(0);
                setSelectedTabOption(-1);
                break;
            }
            case "/services" : {
                setValue(1);
                setSelectedTabOption(-1);
                break;
            }
            case "/about" : {
                setValue(2);
                setSelectedTabOption(-1);
                break;
            }
            case "/revolution" : {
                setValue(3);
                setSelectedTabOption(-1);
                break;
            }
            case "/contacts" : {
                setValue(4);
                setSelectedTabOption(-1);
                break;
            }
            case "/estimate" : {
                setValue(5);
                setSelectedTabOption(-1);
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

    let classes = style(theme);

    let options = [
        {
            services : "Services",
            icon : <SettingsIcon/>
        },
        {
            web : "Web site development",
            icon : <LanguageIcon/>
        },
        {
            desktop : "Desktop software development",
            icon : <DesktopWindowsIcon/>
        },
        {
            mobile : "Mobile development",
            icon : <PhonelinkSetupIcon/>
        },
    ];

    let tabs = [
        {
            home : "Home",
            icon : <HomeIcon/>
        },
        {
            about : "About us",
            icon : <InfoIcon/>
        },
        {
            revolution : "Revolution",
            icon : <FiberNewIcon/>
        },
        {
            contacts : "Our contacts",
            icon : <ContactsIcon/>
        },
        {
            estimate : "Free estimate",
            icon : <PhoneInTalkIcon/>
        },
    ];

    let menuOptions = options.map((option, index) => {
        let key = Object.keys(option)[0];
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
                      classes={{selected : classes.selected}} selected={selectedTabOption === index}
            >{value}</MenuItem>
        );
    });

    let drawerOptions = tabs.concat(options).map((option, index) => {
        let keys = Object.keys(option);
        let key = keys[0];
        let icon = option["icon"];
        let value = option[key];
        return (
            <ListItem button selected={selectedDrawerOption === index} component={Link} to={"/" + (key === "home" ? "" : key)} onClick={(e) => {
                toggleDrawer(e);
                setSelectedDrawerOption(index);
            }}>
                <ListItemIcon>
                    {icon ? icon : null}
                </ListItemIcon>
                <ListItemText primary={value}/>
            </ListItem>
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
            <Button color={"secondary"} variant={"contained"} className={classes.estimate} component={Link} to={"/estimate"} onClick={() => {
                setSelectedDrawerOption(4);
                setValue(-1);
            }}>Free Estimate</Button>
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
                <List>
                    <IconButton size={"small"}>
                        <CloseIcon onClick={toggleDrawer}/>
                    </IconButton>
                    {drawerOptions}
                </List>
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