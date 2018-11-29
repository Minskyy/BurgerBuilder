import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/Navigationitems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

import Aux from '../../../hoc/Auxiliary/Aux';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (

        <Aux>
            <Backdrop show={props.open} clicked ={props.toggle}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" />

                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>

        </Aux>
        
    );
}


export default sideDrawer;
