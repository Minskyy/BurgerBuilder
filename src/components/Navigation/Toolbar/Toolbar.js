import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import NavigationItems from "../NavigationItems/Navigationitems";

const toolbar = props => (
	<header className={classes.Toolbar}>
		<DrawerToggle toggle={props.toggle}> </DrawerToggle>
		<Logo height="80%" />
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuthenticated={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;
