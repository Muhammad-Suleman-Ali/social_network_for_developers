import React, { Component } from 'react'
import { connect } from "react-redux";
import {loginUser  } from "../../../redux/actions/authActions";

import {withRouter  } from "react-router-dom"
import TextfieldGroup from "../common/TextfieldGroup"

class Login extends Component {
    constructor(history){
        super(history);
        this.state={
            email:'',
            password:'',
            errors:''
        }
    };
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard')
      }
    }
    static getDerivedStateFromProps(nextProps){
      if(nextProps.auth.isAuthenticated){ 
        nextProps.history.push('/dashboard')
      }

     
      if(nextProps.errors){
        return {errors:nextProps.errors}
      }
    }
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    onSubmit=(e)=>{
        e.preventDefault();
        const userData ={
            email:this.state.email,
            password:this.state.password
        };
        this.props.loginUser(userData);
    }
    render() {
      const {errors} = this.state; 
      
        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                  <TextfieldGroup 
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange= {this.onChange} 
                    error= {errors.email}
                  />
                  <TextfieldGroup
                    type="password"
                    placeholder="Password"
                    name="password" 
                    value={this.state.password}
                        onChange= {this.onChange} 
                        error={errors.password}
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
const mapStateToProps =state => ({
  auth: state.auth,
  errors:state.errors
});

export default connect(mapStateToProps, {loginUser}) (withRouter(Login))