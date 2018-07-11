import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";

import upvoteGrey from "../../Assets/upvote.svg";
import downvoteGrey from "../../Assets/downvote.svg";

import upvoteBlack from "../../Assets/upvoteBlack.svg";
import downvoteBlack from "../../Assets/downvoteBlack.svg";

class UserBar extends React.Component {
  state = {
    categories: [
      "All Posts",
      "Announcements",
      "Dev Team",
      "Design Team",
      "Marketing",
      "HR",
      "Product Managers",
      "QA"
    ],
    upvoted: false,
    downvoted: false,
  }
  
  render() {
    let user;
    let upvoteIcon = this.state.upvoted ? upvoteBlack : upvoteGrey;
    let downvoteIcon = this.state.downvoted ? downvoteBlack : downvoteGrey;
    let voteHandler;
    let currentUser = this.props.currentUser;
    let upvotes = this.props.info.upvotes;
    let downvotes = this.props.info.downvotes;
    let authorPic = this.props.info.profilePicture;
    
    if (!upvotes) upvotes = 0;
    if (!downvotes) downvotes = 0;

    if (this.props.info.firstName) {
      user = this.props.info.firstName.concat(` ${this.props.info.lastName}`);
    } else {
      user = this.props.info.nickname;
    }

    const convertTime = time => {
      const splitTime = time.split(/[- 'T']/);
      return `${splitTime[1]}-${splitTime[2]}-${splitTime[0]}`;
    };

    const followPost = (e, userId, parentId, toggleFollowing) => {
      e.preventDefault();
      // console.log('following', userId, parentId);
      axios
        .post(`${process.env.REACT_APP_URL}api/follows`, { userId, parentId })
        .then(res => {
          console.log('successfully followed post!', res);
          toggleFollowing();
        })
        .catch(err => {
          console.log('There was an error: ', err.response);
        })
    };

    const unfollowPost = (e, userId, parentId, toggleFollowing) => {
      e.preventDefault();
      // console.log('unfollowing', userId, parentId);
      axios
        .delete(`${process.env.REACT_APP_URL}api/follows`, {data: { userId, parentId }})
        .then(res => {
          console.log('successfully unfollowed post!', res);
          toggleFollowing();
        })
        .catch(err => {
          console.log('There was an error: ', err.response);
        })
    };

    const alreadyVoted = () => event => {
      event.stopPropagation();
      console.log("Already voted!");
    }

    const vote = (voteType, parentType) => event => {
      const voteBody = {
        userId: currentUser,
        parentId: this.props.info.id,
        voteType: voteType,
        parentType: parentType
      }
      event.stopPropagation();
      axios
        .post(`${process.env.REACT_APP_URL}`.concat('api/votes'), voteBody)
        .then((res) => {
          if (voteType === "INC") {
            this.props.info.upvotes = this.props.info.upvotes + 1;
            this.setState({ upvoted: true, downvoted: false });
          } else {
            this.props.info.downvotes = this.props.info.downvotes + 1;
            this.setState({ upvoted: false, downvoted: true });
          }
        })
        .catch((err) => {
          console.error(err);
        })
    }

    if (this.state.upvoted || this.state.downvoted) {
      voteHandler = alreadyVoted;
    } else {
      voteHandler = vote;
    }
  
    const profilePicStyle = {
      width: "35px",
      height: "35px",
      borderRadius: "50%",  
    };

    return (
      <div className="user-bar__container">
        <div className="user-bar__userInfo">
          <img src={authorPic} alt="PostPicture" style={profilePicStyle} />
          <span>{user}</span>
        </div>
        {this.props.type === "allposts" && (
          <div className="user-bar__info">
            {/* TODO: make this dynamic */}
            <div className="user-bar__voteInfo">
              <img src={upvoteIcon} alt="Upvotes" height="13px" width="11px" />
              <div className="votes">{upvotes}</div>
              <img src={downvoteIcon} alt="Downvotes" height="13px" width="11px" />
              <div className="votes">{downvotes}</div>
            </div>
            <div className="user-bar__category">
              <img src={require(`../../Assets/GreyCategories/${this.state.categories[this.props.info.categoryId]}.svg`)} alt="CategoryIcon" className="categoryIconStyle" />
              <div>{this.state.categories[this.props.info.categoryId]}</div>
            </div>
            <div className="user-bar__post-details">
              <div>{convertTime(this.props.info.createdAt)}</div>
              <div>{this.props.info.viewCount} Views</div>
              <div>{this.props.info.commentCount} Comments</div>
            </div>
          </div>
        )}
        {this.props.type === "singlepost" && (
          <div className="user-bar__singlepost-info">
            <div className="user-bar__singlepost-category">
              <img src={require(`../../Assets/GreyCategories/${this.state.categories[this.props.info.categoryId]}.svg`)} alt="CategoryIcon" className="categoryIconStyle" />
              <div>{this.state.categories[this.props.info.categoryId]}</div>
            </div>
            <div className="user-bar__voteInfo">
              <div className="votes">{upvotes}</div>
              <img src={upvoteIcon} onClick={voteHandler('INC', 'post')} alt="Upvotes" height="13px" width="11px" />
              <img src={downvoteIcon} onClick={voteHandler('DEC', 'post')} alt="Downvotes" height="13px" width="11px" />
              <div className="votes">{downvotes}</div>
            </div>
            <div>{this.props.info.commentCount} Comments</div>
            <Button 
              onClick={(event) => {
                this.props.following ? 
                unfollowPost(event, this.props.currentUser.sub, this.props.info.id, this.props.toggleFollowing)
                :
                followPost(event, this.props.currentUser.sub, this.props.info.id, this.props.toggleFollowing)
              }}
              variant="contained"
              className="user-bar__singlepost-followBtn"
              color={this.props.following ? 'default' : 'primary'}
            >
              {this.props.following ? 'Unfollow' : 'Follow Thread' }
            </Button>          
          </div>
        )}
        {this.props.type === "comment" && (
          <div className="user-bar__comment-info">
            <Button onClick={this.props.toggleReply}>Reply</Button>
            <div className="user-bar__voteInfo">
              <div className="votes">{upvotes}</div>
              <img src={upvoteIcon} onClick={voteHandler('INC', 'comment')} alt="Upvotes" height="13px" width="11px" />
              <img src={downvoteIcon} onClick={voteHandler('DEC', 'comment')} alt="Downvotes" height="13px" width="11px" />
              <div className="votes">{downvotes}</div>
            </div>
          </div>
        )}
        {this.props.type === "writecomment" && (
          <div className="user-bar__comment-button">
            <Button onClick={this.props.submitComment()}>Post Comment</Button>
          </div>
        )}
        {this.props.type === "writereply" && (
          <div className="user-bar__reply-button">
            <Button onClick={this.props.submitReply()}>Post Reply</Button>
          </div>
        )}
      </div>
    );
  }
}

export default UserBar;
