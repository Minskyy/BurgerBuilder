import React, { Component } from "react";
import Aux from "../Auxiliary/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};
	SideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					toggle={this.SideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					toggle={this.SideDrawerToggleHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
