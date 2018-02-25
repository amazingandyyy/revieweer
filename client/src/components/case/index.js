import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchOneCase } from '../../actions';

class Case extends Component {
  componentDidMount(){
    const {caseId} = this.context.router.route.match.params;
    if(!caseId) return this.context.router.history.push('/explore');
    this.props.fetchOneCase(caseId);
  }
  render(){
    console.log(this.props.case);
    return <div className='admin-component'>
    </div>
  }
}

function mapStateToProps(props) {
  return {
    case: props.case.details
  }
}

export default connect(mapStateToProps, {fetchOneCase})(Case);