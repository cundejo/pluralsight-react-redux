import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {Link} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Courses</h1>
        <Link to="/course" className="btn btn-success">Add Course</Link>
        <CourseList courses={this.props.courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

// What objects of the whole store we want to expose in the component,
// in this case we are exposing only courses, so the component only will re-render
// when courses change in the store.
function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

// What actions we want to expose as props in the component,
// in this case we are exposing all the courseActions in prop.actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

