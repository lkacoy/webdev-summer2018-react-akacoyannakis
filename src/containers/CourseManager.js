import React, {Component} from 'react';
import CourseCard from '../components/CourseCard';

class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <div className="card-deck">
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        )
    }
}

export default CourseManager;