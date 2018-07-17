import React from 'react';

class MenuItem extends React.Component {
  state = {
    content: '',
    grammar: ' missing',
    parentType: 'missing',
  }
  componentDidMount() {
    if (!this.state.content) {
      this.setup();
    }
  }

  setup = () => {
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
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.props.changeCurrentCategory(['PostPage', null], this.props.id)(event);
    }
  }
  render() {
    const { firstName, lastName, profilePicture, changeCurrentCategory, id, index, notificationId } = this.props;
    const { grammar, parentType, content } = this.state;
    return (
      <div
        tabIndex="0"
        role="menuitem"
        onClick={changeCurrentCategory(["PostPage", null], id)}
        onKeyPress={this.handleKeyPress}
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

export default (notifications, clearNotifications, changeCurrentCategory) => {
  return (
    <div id="notifications-menu" className="notifications-menu">
      <div className="notifications-menu__header">
        <span>notifications</span>
        <button onClick={clearNotifications}>clear</button>
      </div>
      { notifications.map((post, index) => {
        return (
          <MenuItem 
            key={post.id}
            index={index}
            {...post}
            changeCurrentCategory={changeCurrentCategory}
          />
        );
      }) }
    </div>
  );
}