import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {getCurrentProfile,deleteAccount} from "../../../redux/actions/profileActions";
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions';


class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteClick=()=>{
        this.props.deleteAccount();
    }
    render() {
        const {user} = this.props.auth;
        const {profile,loading} = this.props.profile
        let dashboardContent; 
        if(profile===null || loading){
            dashboardContent= <Spinner/>;
        }else {
            // check if logged in user has a profile data 
            if (Object.keys(profile).length>0){
                 dashboardContent= (
                     <div>
                         <p className="lead text-muted">
                          Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link></p>
                     <ProfileActions/>
                     {/* Todo:exp and edu */}
                     <div style={{marginBottom:'60px'}}/>
                     <div onClick={this.onDeleteClick} className='btn btn-danger'>Delete My Account </div>
                     </div>
                 ) 
            }
            else{
                // user is logged in but has n0 profile
                dashboardContent =(
                    <div> 
                    <p className="lead text-muted"> Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info  </p>
                    <Link to='create-profile' className='btn btn-lg btn-info '>Create Profile </Link>
                    </div>
                ) 
            }
        }


        return (
            <div className="dashboard">
                <div className='container'> 
                <div className='row'>
                    <div className='col-md-12'>
                         <h1 className='display-4'>Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth:state.auth
})

export default connect(mapStateToProps, {getCurrentProfile,deleteAccount}) (Dashboard);