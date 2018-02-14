import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getUserProfile} from '../actions';

class Header extends Component {
    componentDidMount(){
        this.props.getUserProfile();
    }
    renderSignButton(){
        const {isLoggedIn, profile} = this.props;
        if (isLoggedIn && profile.name){
            return (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {profile.name.first}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink className="dropdown-item" to="/account">Account</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/signout">Log out</NavLink>
                    </div>
                </li>
            )
        }else{
            return (
                [
                    <li className="nav-item" key="1">
                        <NavLink to="/signin" className="nav-link">Sign in</NavLink>
                    </li>,
                    <li className="nav-item" key="2">
                        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                    </li>
                ]
            )
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand fixed-bottom navbar-dark">
                <a className="navbar-brand" href="/">Revieweer</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/explore">Explore</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {this.renderSignButton()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth, profile}){
    return {
        isLoggedIn: auth.authenticated,
        profile: profile
    }
}

export default connect(mapStateToProps, {getUserProfile})(Header)