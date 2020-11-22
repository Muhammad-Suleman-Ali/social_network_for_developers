import React, { Component } from 'react';
import {withRouter  } from "react-router-dom";
import TextfieldGroup from '../layout/common/TextfieldGroup';
import {connect } from 'react-redux';
import {addEducation } from '../../redux/actions/profileActions';


class AddEducation extends Component {
    constructor(props){
        super(props);
    this.state={
        school:'',
        degree:'',
        fieldofstudy:'',
        company:'',
        from :'',
        to:'',
        current:false,
        descriptions:'',
        errors:{},
        disabled:false

    }
    }

static getDerivedStateFromProps(nextProps){
if(nextProps.errors){
 return{
        errors:nextProps.errors
}
}}    
    onSubmit=(e)=>{
        e.preventDefault();
        const eduData ={
            school:this.state.school,
            degree:this.state.degree,
            fieldofstudy:this.state.fieldofstudy,
            from :this.state.from,
            to:this.state.to,
            current:this.state.current,
            descriptions:this.state.descriptions, 
        };

        this.props.addEducation(eduData,this.props.history);
    };
    onChange=(e)=>{
        
    this.setState({[e.target.name]:e.target.value})
    };
    onCheck=(e)=>{
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })
    }
    render() {
        const {errors} =this.state;
        return (

            <div className='add-education'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                    <h1 className='display-4 text-center '>Add Education</h1>
                    <p className='lead text-center '>
                        Add your education details  
                    </p>
                    <small className='d-block pb-3'> * = required fields </small>   
                    <form onSubmit={this.onSubmit}>
                    <TextfieldGroup 
                                 placeholder = '* School Name'
                                 name="school"
                                 value={this.state.school}
                                 onChange={this.onChange}
                                 error ={errors.school}
                               />
                    <TextfieldGroup 
                                 placeholder = '* Degree or Certification'
                                 name="degree"
                                 value={this.state.degree}
                                 onChange={this.onChange}
                                 error ={errors.degree}
                               />
                    <TextfieldGroup 
                                 placeholder = '* Field Of Study'
                                 name="fieldofstudy"
                                 value={this.state.fieldofstudy}
                                 onChange={this.onChange}
                                 error ={errors.fieldofstudy}
                               />                   
                               <h6>From Date</h6>
                    <TextfieldGroup 
                                 type='date'
                                 name="from"
                                 value={this.state.from}
                                 onChange={this.onChange}
                                 error ={errors.from}
                               />
                               <h6>To Date</h6>
                    <TextfieldGroup 
                               type="date"
                                 name="to"
                                 value={this.state.to}
                                 onChange={this.onChange}
                                 error ={errors.to}
                                 disabled={this.state.disabled ? 'disabled' : ''}
                               />
                               <div className='form-check mb-4'>
                                   <input 
                                   type='checkbox' 
                                   className='form-check-input'
                                   name='current'
                                   value={this.state.current}
                                   checked={this.state.current}
                                   onChange={this.onCheck}
                                   id='current'    
                                   />
                                    <label htmlFor='current' className='form-check-label'>Current Job </label>
                               </div>
                               <input  type='submit' value='submit' className='btn btn-info btn-block mt-4' />
                         </form>
                     </div>
                </div>
            </div>
        </div>

            
        )
    }
};
const mapStateToProps = (state)=>({
    profile: state.profile,
    errors:state.errors
});

export default connect(mapStateToProps,{addEducation }) (withRouter(AddEducation));