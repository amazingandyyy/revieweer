import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class AuthAdmin extends Component {
    componentWillMount() {
      if (!localStorage.getItem('is_admin')) {
        this.context.router.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!localStorage.getItem('is_admin')) {
        this.context.router.history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth}) {
    return { isAdmin: auth.isAdmin };
  }
  AuthAdmin.contextTypes = {
    router: PropTypes.object
  }

  return connect(mapStateToProps)(AuthAdmin);
}