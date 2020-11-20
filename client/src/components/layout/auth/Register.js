import React, { Component } from 'react';
import classnames from "classnames";
import { connect } from "react-redux";
import {registerUser} from '../../../redux/actions/authActions'
import {withRouter  } from "react-router-dom"
import TextfieldGroup from "../common/TextfieldGroup"


class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        }
    };
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard')
      }
    }
    static getDerivedStateFromProps(nextProps){
      if(nextProps.errors){
        return{
          errors:nextProps.errors}
      }};

    onChange =(e)=>  {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit= (e)=> {
        e.preventDefault();

        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        };

        this.props.registerUser(newUser,this.props.history);
        
    }

   




    render() {
        const {errors} =this.state;
        return (
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form noValidate onSubmit={this.onSubmit}>
                  <TextfieldGroup 
                   placeholder="Name"
                    type="text"
                    name="name"
                    value={this.state.name}
                     onChange={this.onChange} 
                    error= {errors.name}
                  />
                  <TextfieldGroup 
                   placeholder="Email Address"
                   type="email"
                    name="email"
                    value={this.state.email}
                     onChange={this.onChange} 
                    error= {errors.email}
                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  />
                   <TextfieldGroup 
                   placeholder="Password"
                   type="password"
                    name="password"
                    value={this.state.password}
                     onChange={this.onChange} 
                    error= {errors.password}
                  />
                   
                   <TextfieldGroup 
                   placeholder="COnfirm Password"
                   type="password"
                    name="password2"
                    value={this.state.password2}
                     onChange={this.onChange} 
                    error= {errors.password2}
                  />
                  
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
};
const mapStateToProps = state => ({
  auth:state.auth,
  errors:state.errors
})

export default  connect(mapStateToProps,{registerUser}) (withRouter(Register)) 