import React, {PropTypes, Context} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CoursesForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  // This function is called in the onChange event of every input
  // of the CourseForm Component, and in every change it will create a copy
  // of the whole object course with the change and save it in the state.
  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  // This event will be called in the submit event of the CourseForm Component.
  saveCourse() {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  // debugger;
  const coursesFiltered = courses.filter(course => course.id === courseId); // Filter always return an array
  if (coursesFiltered.length) {
    return coursesFiltered[0];
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path /course/:id

  let course = {
    id: '', watchHref: '', title: '', authorId: '', length: '', category: ''
  };

  if (courseId && state.courses.lentgth > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(
    author => {
      return {
        value: author.id,
        text: author.firstName + ' ' + author.lastName
      };
    }
  );

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
