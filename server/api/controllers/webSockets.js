const uuidv4 = require('uuid/v4');

const knex = require('../../database/db.js');

const connectedUsers = {};

const storeNotification = (obj) => {
  // console.log('creating new notification...');
  const id = uuidv4();
  const table = 'notification';
  const {
    sourceId, targetId, postId, type,
  } = obj;

  // console.log( sourceId, targetId, postId, type );

  return knex
    .insert({ id, sourceId, targetId, postId, type })
    .into(table)
    .then((response) => {
      // console.log({ type: 'success', data: 'Notification Saved'});
    })
    .catch((error) => {
      // console.log({ type: 'error', data: 'Failed to save Notification'});
    });
};

const sendNotifications = (userId) => {
  const fetch = (() => {
    return knex('notification')
      .where({ targetId: userId })
  })();

  fetch
    .join('user', 'notification.sourceId', '=', 'user.id')
    .join('post', 'notification.postId', '=', 'post.id')
    .select(
      'post.categoryId as postCategoryId',
      'post.commentCount as postCommentCount',
      'post.content as postContent',
      'post.createdAt as postCreatedAt',
      'post.id as postId',
      'post.updatedAt as postUpdatedAt',
      'post.userId as postUserId',
      'post.viewCount as postViewCount',
      'user.firstName as sourceFirstName',
      'user.lastName as sourceLastName',
      'user.profilePicture as sourceProfilePicture',
      'notification.type as notificationType'
    )
    .then(response => connectedUsers[userId].send(JSON.stringify({ type: 'notifications', data: response })))
    .catch(err => JSON.stringify({ type: 'error', data: err}));
    // TODO: delete sent notifications from DB
}

const sendOrStore = async (userId, obj) => {
  if (connectedUsers[userId]) {
    await storeNotification(obj);
    sendNotifications(userId);
  } else {
    storeNotification(obj);
  }
}

const webSocketConnect = (ws, req) => {
  console.log((new Date()) + ' Connection from origin '
  + req.connection.remoteAddress + '.');

  let userId;

  ws.on('message', message => {
    const messageObj = JSON.parse(message);
    // console.log(messageObj, typeof messageObj);
    if (messageObj.type && messageObj.type === 'userConnecting') {
      // console.log(messageObj);
      userId = messageObj.data.sub
      connectedUsers[userId] = ws;
      sendNotifications(userId);
    }
  })

  ws.on('close', connection => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
    delete connectedUsers[userId];
  });
}

module.exports = {
  webSocketConnect,
  sendOrStore,
};
