import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import Moment from 'react-moment';
import {deleteExperience} from '../../../redux/actions/profileActions'

class Experience extends Component {
   

    onDeleteClick = ()=>{
        this.props.deleteExperience(exp,this.props.history);
    }


    render() {
        const   experience = this.props.experience.map(exp => (
            // console.log(exp);
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
               
                    <Moment format= "YYYY-MM-DD">{exp.from}</Moment> <b>To</b> {' '}
                   { exp.to === null ?( " Now ") : ( <Moment format= "YYYY-MM-DD">{exp.to}</Moment>)}
                </td>
                <td><button onClick={this.onDeleteClick(exp._id)} className='btn btn-danger'>Delete</button> </td>
            </tr>
        ));

        return (
            <div>
            <h4  className='mb-4'>Experience Credentials</h4>
            <table className='table'> 
            <thead > 
                 <tr>
                 <th>Company</th>
                 <th>Title</th>
                 <th>Years</th>
                 <th></th>
                 </tr>
                
                    {experience}
            </thead>
            </table> 
                
            </div>
        )
    }
}
export default connect(null,{deleteExperience})(withRouter(Experience));