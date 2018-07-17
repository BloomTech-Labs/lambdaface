import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";

import upvoteGrey from "../../Assets/upvote.svg";
import downvoteGrey from "../../Assets/downvote.svg";

import upvoteBlack from "../../Assets/upvoteBlack.svg";
import downvoteBlack from "../../Assets/downvoteBlack.svg";

import LeftNavSVG from "../../Assets/LeftNavCategory/LeftNavSVG";


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
  componentDidMount() {
    this.checkVoted(this.props.hasUserVoted);
  }
  checkVoted = vote => {
    if (vote === 'INC') {
      return this.setState({ upvoted: true });
    }
    if (vote === 'DEC') {
      return this.setState({ downvoted: true });
    }
  }
  
  render() {
    let user;
    let currentUser;
    let upvoteIcon = this.state.upvoted ? upvoteBlack : upvoteGrey;
    let downvoteIcon = this.state.downvoted ? downvoteBlack : downvoteGrey;
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
        .then(response => {
          console.info('successfully followed post!', response);
          toggleFollowing();
        })
        .catch(error => console.error('There was an error:', error.response));
    };

    const unfollowPost = (e, userId, parentId, toggleFollowing) => {
      e.preventDefault();
      // console.log('unfollowing', userId, parentId);
      axios
        .delete(`${process.env.REACT_APP_URL}api/follows`, {data: { userId, parentId }})
        .then(response => {
          console.info('successfully unfollowed post!', response);
          toggleFollowing();
        })
        .catch(error => console.error('There was an error:', error.response));
    };

    const voteHandler = (voteType, parentType) => event => {
      if (parentType === "post") {
        currentUser = this.props.currentUser.sub;
      } else if (parentType === "comment") {
        currentUser = this.props.currentUser;
      }
      const voteBody = {
        userId: currentUser,
        parentId: this.props.info.id,
        voteType,
        parentType,
      }
      event.stopPropagation();
      axios
        .post(`${process.env.REACT_APP_URL}api/votes`, voteBody)
        .then(() => {
          if (voteType === "INC" && this.state.upvoted) {
            console.info("Already voted!");
          }
          else if (voteType === "INC" && this.state.downvoted) {
            this.props.info.upvotes = this.props.info.upvotes + 1;
            this.props.info.downvotes = this.props.info.downvotes - 1;
            this.setState({ upvoted: true, downvoted: false });
          }
          else if (voteType === "DEC" && this.state.upvoted) {
            this.props.info.upvotes = this.props.info.upvotes - 1;
            this.props.info.downvotes = this.props.info.downvotes + 1;
            this.setState({ upvoted: false, downvoted: true });
          }
          else if (voteType === "DEC" && this.state.downvoted) {
            console.info("Already voted!");
          }
          else if (voteType === "INC" && !this.state.upvoted && !this.state.downvoted) {
            this.props.info.upvotes = this.props.info.upvotes + 1;
            this.setState({ upvoted: true, downvoted: false });
          }
          else if (voteType === "DEC" && !this.state.upvoted && !this.state.downvoted) {
            this.props.info.downvotes = this.props.info.downvotes + 1;
            this.setState({ upvoted: false, downvoted: true });
          }
        })
        .catch(error => console.error(error));
    }
  
    const profilePicStyle = {
      width: "35px",
      height: "35px",
      borderRadius: "50%",  
    };
    
    return (
      <div className="user-bar__container">
        <div className="user-bar__userInfo">
          <img src={`${authorPic}?${this.props.imageHash}`} alt="PostPicture" style={profilePicStyle} />
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
              <LeftNavSVG image={this.state.categories[this.props.info.categoryId]} fill="rgb(169,169,169)" />
              <div className="user-bar__category-name">{this.state.categories[this.props.info.categoryId]}</div>
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
              <LeftNavSVG image={this.state.categories[this.props.info.categoryId]} fill="rgb(169,169,169)" />
              <div className="user-bar__category-name">{this.state.categories[this.props.info.categoryId]}</div>
            </div>
            <div className="user-bar__voteInfo">
              <div className="votes">{upvotes}</div>
              <img src={upvoteIcon} role="button" onClick={voteHandler('INC', 'post')} alt="Upvotes" height="13px" width="11px" />
              <img src={downvoteIcon} rolle="button" onClick={voteHandler('DEC', 'post')} alt="Downvotes" height="13px" width="11px" />
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
              style={this.props.info.userId !== this.props.currentUser.sub ? {visibility: 'visible'} : {visibility: 'hidden'}}
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
            <Button onClick={this.props.submitComment}>Post Comment</Button>
          </div>
        )}
        {this.props.type === "writereply" && (
          <div className="user-bar__reply-button">
            <Button onClick={this.props.submitReply}>Post Reply</Button>
          </div>
        )}
      </div>
    );
  }
}

export default UserBar;