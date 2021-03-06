import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorhandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userID);
	}

	render() {
		let orders = <Spinner />;

		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			));
		}
		return <div>{orders}</div>;
	}
}
const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userID: state.auth.userID,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userID) =>
			dispatch(actions.fetchOrders(token, userID)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(Orders, axios));
