import React from 'react';

import notificationBell from '../../Assets/notificationBell.svg';

class MenuItem extends React.Component {
  state = {
    content: '',
    grammar: ' missing',
    parentType: 'missing',
  }
  componentDidMount() {
    console.log(this.props, this.state);
    const [ grammar, parentType ] = this.parseGrammar(this.props.notificationType);

    this.setState({
      content: this.parseContent(this.props.content),
      grammar,
      parentType,
    });
  }

  parseContent = content => {
    if (content.length > 25) {
      return content.substring(0, content.indexOf(" ", 25));
    }
    return content;
  }

  parseGrammar = type => {
    switch(type) {
      case 'comment':
        return [' commented on', 'your post'];
      case 'commentfollow':
        return [' commented on', 'a post you are following:'];
      case 'reply':
        return [' replied to', 'your comment'];
      case 'replyfollow':
        return [' replied on', 'a post you are following:'];
      default:
        return [' missing', 'missing'];
    }
  }
  render() {
    const { firstName, lastName, profilePicture, changeCurrentCategory, id, index, notificationId } = this.props;
    const { grammar, parentType, content } = this.state;
    return (
      <div onClick={changeCurrentCategory(["PostPage", null], id)} 
        className={"notifications-menu__item notifications-menu__item--" + (index % 2 ? "light" : "dark")} 
        key={notificationId}
      >
        <div className="notifications-menu__item__user">
          <img className="notifications-menu__item__user-image" src={profilePicture} alt={`${firstName} ${lastName}`} />
          <strong>{`${firstName} ${lastName}`}</strong>
        </div>
        <p className="notifications-menu__item__text">
          { grammar } { parentType }
          <strong> { content }</strong>
        </p>
      </div>
    );
  }
}

const NotificationsMenu = (notifications, clearNotifications, changeCurrentCategory) => {
  return (
    <div id="notifications-menu" className="notifications-menu">
      <div className="notifications-menu__header">
        <span>notifications</span>
        <button onClick={clearNotifications}>clear</button>
      </div>
      { notifications.map((post, index) => {
        return <MenuItem 
          key={post.id}
          index={index}
          {...post}
          changeCurrentCategory={changeCurrentCategory}
        />;
      }) }
    </div>
  );
}

class Notifications extends React.Component {
  state = {
    displayNotificationsMenu: false
  };

  componentDidMount() {
    window.addEventListener('click', this.handleNotificationsDisplay);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleNotificationsDisplay);
  }

  toggleNotificationMenu = length => {
    if (length) {
      this.setState(prev => ({
        displayNotificationsMenu: !prev.displayNotificationsMenu,
      }));
    }
  }

  handleNotificationsDisplay = event => {
    if (this.state.displayNotificationsMenu) {
      const test1 = document.getElementById('notifications-menu').contains(event.target);
      const test2 = document.getElementById('notifications-icon').contains(event.target);
      if (!test1 && !test2){
        this.setState({ displayNotificationsMenu: false });
      }
    }
  }

  render() {
    const { notifications } = this.props;
    return (
      <div
        id="notifications-icon"
        className="top-bar__notifications"
        onClick={() => this.toggleNotificationMenu(notifications.length)}
      >
        { notifications && notifications.length
            ? <div className="top-bar__notifications__icon">
                <span>{notifications.length}</span>
              </div>
            : ''
        }
        <img
          className="top-bar__notifications__bell"
          src={notificationBell}
          alt="notifications icon"  
        />
        { this.state.displayNotificationsMenu
          ? NotificationsMenu(notifications, this.props.clearNotifications, this.props.changeCurrentCategory)
          : ''
        }
      </div>
    );
  }
}

export default Notifications;
