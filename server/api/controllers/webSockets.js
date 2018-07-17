const uuidv4 = require('uuid/v4');

const knex = require('../../database/db.js');

const connectedUsers = {};

const { _joinVote } = require('./helpers.js')

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
  // console.log('sending notifications! here are the connected users:', Object.keys(connectedUsers));
  const fetch = (() => {
    return knex('notification')
      .where({ targetId: userId })
  })();

  fetch
    .join('user', 'notification.sourceId', '=', 'user.id')
    .join('post', 'notification.postId', '=', 'post.id')
    .leftJoin( ..._joinVote('post', 'INC') )
    .leftJoin( ..._joinVote('post', 'DEC', 'dv') )
    .select(
      'notification.id as notificationId',
      'post.categoryId as categoryId',
      'post.commentCount as commentCount',
      'post.content as content',
      'post.createdAt as createdAt',
      'post.id as id',
      'post.updatedAt as updatedAt',
      'post.userId as userId',
      'post.viewCount as viewCount',
      'user.firstName as firstName',
      'user.lastName as lastName',
      'user.profilePicture as profilePicture',
      'notification.type as notificationType',
      'v.upvotes as upvotes',
      'dv.downvotes as downvotes'
    )
    .then(response => 
      // delete sent notifications from DB
      knex('notification')
      .where({ targetId: userId })
      .del()
      .then(() => {
        connectedUsers[userId].send(JSON.stringify({ type: 'notifications', data: response }))
      })
    )
    .catch(err => JSON.stringify({ type: 'error', data: err}));
}

const sendOrStore = async (userId, obj) => {
  if (connectedUsers[userId]) {
    await storeNotification(obj);
    sendNotifications(userId);
  } else {
    // console.log(`\nuserId ${userId} not found in connected Users, storing notification.`)
    storeNotification(obj);
  }
}

const webSocketConnect = (ws, req) => {
  console.info('\n', new Date() + ' Connection from origin '
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
    console.info(`\n${new Date()} Peer ${userId} disconnected.`);
    delete connectedUsers[userId];
  });
}

module.exports = {
  webSocketConnect,
  sendOrStore,
};
