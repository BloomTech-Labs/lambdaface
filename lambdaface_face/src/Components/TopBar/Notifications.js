import React from 'react';

import NotificationsMenu from './NotificationsMenu';
import notificationBell from '../../Assets/notificationBell.svg';

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

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.toggleNotificationMenu(this.props.notifications.length);
    }
  }

  render() {
    const { notifications, clearNotifications, changeCurrentCategory } = this.props;
    return (
      <div
        role="button"
        id="notifications-icon"
        className="top-bar__notifications"
        onClick={() => this.toggleNotificationMenu(notifications.length)}
        tabIndex="0"
        onKeyDown={this.handleKeyPress}
      >
        { notifications && notifications.length
            ? (
              <div className="top-bar__notifications__icon">
                <span>{notifications.length}</span>
              </div>
            ) : ''
        }
        <img
          className="top-bar__notifications__bell"
          src={notificationBell}
          alt="notifications icon"  
        />
        { this.state.displayNotificationsMenu
          ? NotificationsMenu(notifications, clearNotifications, changeCurrentCategory)
          : ''
        }
      </div>
    );
  }
}

export default Notifications;
