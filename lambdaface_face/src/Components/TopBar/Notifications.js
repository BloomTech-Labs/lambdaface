import React from 'react';

import notificationBell from '../../Assets/notificationBell.svg';
// import notificationCircle from '../../Assets/notificationCircle.svg';

const NoticeMeSenpi = (numb) => (
  <div className="top-bar__notifications__icon">
    <span>{numb}</span>
    {/* <img src={notificationCircle} alt={`${numb} new notifications`} /> */}
  </div>
);

const NotificationsMenu = (notifications, clearNotifications, changeCurrentCategory) => {
  const grammarParser = (type) => {
    switch(type) {
      case 'comment':
        return [' commented on', 'post'];
      case 'reply':
        return [' replied to', 'comment'];
      default:
        return [' missing', 'missing'];
    }
  };

  const contentParser = (content) => (
    content.length > 25 
      ? content.substring(0, content.indexOf(" ", 25))
      : content
  );
  return (
    <div id="notifications-menu" className="notifications-menu">
      <div className="notifications-menu__header">
        <span>notifications</span>
        <button onClick={clearNotifications}>clear</button>
      </div>
      { notifications.map((post, i) => {
        const { firstName, lastName, profilePicture, content, notificationType } = post;
        const [ grammar, parentType ] = grammarParser(notificationType);
        return (
          <div onClick={changeCurrentCategory(["PostPage", null], post)} className={"notifications-menu__item notifications-menu__item" + (i % 2 ? "--light" : "--dark")} key={post.id}>
            <div className="notifications-menu__item__user">
              <img className="notifications-menu__item__user-image" src={profilePicture} alt={`${firstName} ${lastName}`} />
              <strong>{`${firstName} ${lastName}`}</strong>
            </div>
            <p className="notifications-menu__item__text">
              { grammar } your { parentType }
              <strong> { contentParser(content) }</strong>
            </p>
          </div>
        );
      }) }
    </div>
  );
}

class Notifications extends React.Component {
  state = {
    // notifications: this.props.notifications || [
    //   {
    //     notificationType:"comment",
    //     postCategoryId:4,
    //     postCommentCount:2,
    //     postContent:"test post marketing",
    //     postCreatedAt:"2018-06-27T23:37:47.000Z",
    //     postId:"08220f9f-e75f-4437-a23e-da4d7b98e70f",
    //     postUpdatedAt:null,
    //     postUserId:"auth0|5b2d30547871d50de045faa6",
    //     postViewCount:19,
    //     sourceFirstName:"Jerry",
    //     sourceLastName:"West",
    //     sourceProfilePicture:"https://s3-us-west-2.amazonaws.com/lambdaface-photos/photos/auth0%7C5b33a7927871d50de047091c",
    //   },
    // ],
    displayNotificationsMenu: false
  };

  componentDidMount() {
    window.addEventListener('click', this.handleNotificationsDisplay);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleNotificationsDisplay);
  }

  toggleNotificationMenu = (length) => {
    if (length) {
      this.setState(({displayNotificationsMenu}) => ({
        displayNotificationsMenu: !displayNotificationsMenu,
      }));
    }
  }

  clearNotifications = () => {
    this.props.clearNotifications();
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
    const notifications = this.props.notifications;
    return (
      <div
        id="notifications-icon"
        className="top-bar__notifications"
        onClick={() => this.toggleNotificationMenu(notifications.length)}
      >
        { notifications && notifications.length
            ? NoticeMeSenpi(notifications.length)
            : ''
        }
        <img
          className="top-bar__notifications__bell"
          src={notificationBell}
          alt="notifications icon"  
        />
        { this.state.displayNotificationsMenu
          ? NotificationsMenu(notifications, this.clearNotifications, this.props.changeCurrentCategory)
          : ''
        }
      </div>
    );
  }
}

export default Notifications;
