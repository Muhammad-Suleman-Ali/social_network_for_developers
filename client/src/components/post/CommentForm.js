import React, { Component } from 'react'
import { connect } from "react-redux"
import { addComment } from '../../redux/actions/postActions';
import TextAreaFieldGroup from '../layout/common/TextAreaFieldGroup';




class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'',
            errors:{}
        }
    }


    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    onSubmit=(e)=>{
        e.preventDefault();
        const {user } =this.props.auth;
        const {postId } =this.props;
        const newComment ={
            text:this.state.text,
            name:user.name,
            avatar:user.avatar
        };
        this.props.addComment(postId, newComment);
        this.setState({
            text:""
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  <TextAreaFieldGroup 
                      placeholder="Reply to post"
                      name='text'
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
                  />
                    <textarea className="form-control form-control-lg" placeholder="Create a post"></textarea>
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
};
const mapStateToProps = (state)=>({
    auth:state.auth,
    errors:state.errors
})
export default connect (mapStateToProps,{addComment})(CommentForm); 