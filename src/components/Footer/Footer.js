import React from "react";
import Adornment from "../../assets/Footer Adornment.svg"
import {useTheme} from "@material-ui/styles";
import style from "./footer-styles";
import {Grid, Hidden} from "@material-ui/core";
import {Link} from "react-router-dom";

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

let Footer = (props) => {

    let setValue = props.setValue;
    let setSelectedTabOption = props.setSelectedTabOption;
    let setSelectedDrawerOption = props.setSelectedDrawerOption;

    let options = [
        [
            {
                home : "Home",
                tab : 0,
                drawer : 0
            },
        ],
        [
            {
                about : "About us",
                tab: 2,
                drawer : 1
            }
        ],
        [
            {
                revolution : "Revolution",
                tab: 3,
                drawer : 2
            }
        ],
        [
            {
                estimate : "Free estimate",
                drawer : 4
            },

            {
                contacts : "Contacts",
                tab : 4,
                drawer: 3
            }
        ],
        [
            {
                services : "Services",
                tab : 1,
                menu : 0,
                drawer: 5
            },

            {
                web : "Web development",
                menu : 1,
                drawer: 6
            },

            {
                desktop : "Desktop Development",
                menu : 2,
                drawer: 7
            },

            {
                mobile : "Mobile development",
                menu : 3,
                drawer: 8
            },
        ],
    ];

    let theme = useTheme();
    let classes = style(theme);

    let renderedColumns = options.map((column) => {
        let renderedColumn = column.map((link) => {
            let keys = Object.keys(link);
            let to = keys[0];
            let desc = link[to];
            if (to === "home"){
                to = "/"
            }
            let click = () => {
                setValue(link["tab"] ? link["tab"] : -1);
                setSelectedTabOption(link["menu"] ? link["menu"] : -1);
                setSelectedDrawerOption(link["drawer"] ? link["drawer"] : -1);
            }
            return (
                <Grid item className={classes.link_item} component={Link} to={to} onClick={click}>
                    {desc}
                </Grid>
            );
        });
        return(
            <Grid item className={classes.link_column} direction={"column"}>
                {renderedColumn}
            </Grid>
        );
    });

    return(
      <footer className={classes.footer}>
          <img src={Adornment} alt={"adornment"} className={classes.adornment}/>
          <Hidden smDown>
              <Grid container className={classes.link_wrapper} direction={"row"} justify={"center"} spacing={8}>
                  {renderedColumns}
              </Grid>
          </Hidden>
          <Hidden mdUp>
              <Grid container className={classes.link_wrapper} spacing={8} justify={"center"} alignItems={"center"}>
                  <Grid item className={classes.link_column}>
                      <a href={"http://instagram.com"}>
                          <InstagramIcon className={classes.social_icon}/>
                      </a>
                  </Grid>
                  <Grid item className={classes.link_column}>
                      <a href={"http://facebook.com"}>
                          <FacebookIcon className={classes.social_icon}/>
                      </a>
                  </Grid>
                  <Grid item className={classes.link_column}>
                      <a href={"http://twitter.com"}>
                          <TwitterIcon className={classes.social_icon}/>
                      </a>
                  </Grid>
              </Grid>
          </Hidden>
      </footer>
    );
}

export default Footer;