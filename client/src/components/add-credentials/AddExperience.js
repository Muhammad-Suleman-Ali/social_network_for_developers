import React, { Component } from 'react';
import {withRouter  } from "react-router-dom";
import TextfieldGroup from '../layout/common/TextfieldGroup';
import {connect } from 'react-redux';
import {addExperience } from '../../redux/actions/profileActions';


class AddExperience extends Component {
    constructor(props){
        super(props);
    this.state={
        company:'',
        title:'',
        location:'',
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
}
}    
    onSubmit=(e)=>{
        e.preventDefault();
        const expData ={
            company:this.state.company,
            title:this.state.title,
            location:this.state.location,
            from :this.state.from,
            to:this.state.to,
            current:this.state.current,
            descriptions:this.state.descriptions, 
        };

        this.props.addExperience(expData,this.props.history);
    }
    onChange=(e)=>{
        e.preventDefault();
    this.setState({[e.target.name]:e.target.value})
    }
    onCheck=(e)=>{
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })
    }
    render() {
        const {errors} =this.state;
        return (

            <div className='add-experience'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                    <h1 className='display-4 text-center '>Add Experience</h1>
                    <p className='lead text-center '>
                        Add any job or position that you have had in the past or current 
                    </p>
                    <small className='d-block pb-3'> * = required fields </small>   
                    <form onSubmit={this.onSubmit}>
                    <TextfieldGroup 
                                 placeholder = '* Company'
                                 name="company"
                                 value={this.state.company}
                                 onChange={this.onChange}
                                 error ={errors.company}
                               />
                    <TextfieldGroup 
                                 placeholder = '* Job Title'
                                 name="title"
                                 value={this.state.title}
                                 onChange={this.onChange}
                                 error ={errors.title}
                               />
                    <TextfieldGroup 
                                 placeholder = 'Location '
                                 name="location"
                                 value={this.state.location}
                                 onChange={this.onChange}
                                 error ={errors.location}
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
})

export default connect(mapStateToProps,{addExperience }) (withRouter(AddExperience));