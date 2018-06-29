import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import LambdaLogo from "../Assets/LambdaLogo.svg";
import notificationBell from '../Assets/notificationBell.svg';
import notificationCircle from '../Assets/notificationCircle.svg';

import Search from "./Search";

const NoticeMeSenpi = (numb) => (
  <div className="top-bar__notifications__icon">
    <span>{numb}</span>
    <img src={notificationCircle} alt={`${numb} new notifications`} />
  </div>
);

const NotificationsMenu = (notifications, clearNotifications) => {

  const grammarParser = (type) => {
    switch(type) {
      case 'comment':
        return ['commented on', 'post'];
      case 'reply':
        return ['replied to', 'comment'];
      default:
        return ['missing', 'missing'];
    }
  }

  const contentParser = (content) => {
    if (content.length > 25) {
      const end = content.indexOf(' ', 25);
      return content.substring(0, end);
    }
    return content;
  }

  return (
    <div id="notifications-menu" className="notifications-menu">
      <div className="notifications-menu__header">
        <span>notifications</span>
        <button onClick={clearNotifications}>clear</button>
      </div>
      { notifications.map((notification, i) => {

        const {
          sourceFirstName,
          sourceLastName,
          sourceProfilePicture,
          postContent,
          notificationType,
        } = notification;

        const [ grammar, parentType ] = grammarParser(notificationType);
        const replier = `${sourceFirstName} ${sourceLastName}`;
        const nClass = "notifications-menu__item";

        return (
          <div className={`${nClass} ${nClass + (i % 2 ? "--light" : "--dark")}`}>
            <div className={`${nClass}__user`}>
              <img
                className={`${nClass}__user-image`}
                src={sourceProfilePicture}
                alt="profile photo"
              />
              <strong>{replier}</strong>
            </div>
            <p className={`${nClass}__text`}>
              { grammar } your { parentType }
              <strong>{contentParser(postContent)}</strong>
            </p>
          </div>
        );
      }) }
    </div>
  );
}

class Notifications extends Component {
  constructor( options ) {
    super(options);
    this.state = {
      notifications: options.notifications || [
        {
          notificationType:"comment",
          postCategoryId:4,
          postCommentCount:2,
          postContent:"test post marketing",
          postCreatedAt:"2018-06-27T23:37:47.000Z",
          postId:"08220f9f-e75f-4437-a23e-da4d7b98e70f",
          postUpdatedAt:null,
          postUserId:"auth0|5b2d30547871d50de045faa6",
          postViewCount:19,
          sourceFirstName:"Jerry",
          sourceLastName:"West",
          sourceProfilePicture:"https://s3-us-west-2.amazonaws.com/lambdaface-photos/photos/auth0%7C5b33a7927871d50de047091c",
        },
      ],
      displayNotificationsMenu: false
    };
  }
  componentDidMount() {
    window.addEventListener('click', this.handleNotificationsDisplay);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleNotificationsDisplay);
  }
  toggleNotificationMenu = () => {
    if (this.state.notifications.length) {
      this.setState(({displayNotificationsMenu}) => ({
        displayNotificationsMenu: !displayNotificationsMenu,
      }));
    }
  }
  clearNotifications = () => {
    this.setState({ notifications: [] });
  }
  handleNotificationsDisplay = (e) => {
    if (this.state.displayNotificationsMenu) {
      const test1 = document.getElementById('notifications-menu').contains(e.target);
      const test2 = document.getElementById('notifications-icon').contains(e.target);
      if (!test1 && !test2){
        this.setState({ displayNotificationsMenu: false });
      }
    }
  }
  render() {
    return (
      <div
        id="notifications-icon"
        className="top-bar__notifications"
        onClick={this.toggleNotificationMenu}
        roll="menuitem"
      >
        { this.state.notifications && this.state.notifications.length
            ? NoticeMeSenpi(this.state.notifications.length)
            : ''
        }
        <img
          className="top-bar__notifications__bell"
          src={notificationBell}
          alt="notifications icon"  
        />
        { this.state.displayNotificationsMenu
          ? NotificationsMenu(this.state.notifications, this.clearNotifications)
          : ''
        }
      </div>
    );
  }
}

export default props => {
  const profilePic = props.userInfo.profilePicture;
  return (
    <div className="top-bar">
      <img src={LambdaLogo} alt="logo" className="top-bar__logo" />
      <Search className="top-bar__search" onSubmit={props.changeCurrentCategory} />
      <Notifications notifications={props.notifications} />
      <div className="top-bar__user-button">
        <Button onClick={props.changeCurrentCategory(["User Settings", null])}>
          <img src={profilePic} alt="profile" className="top-bar__user-image" />
        </Button>
      </div>
    </div>
  );
};
