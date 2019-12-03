import * as constant from '../constant';

export default (pubsub) => {

  const sendMsg = (data) => {
    pubsub.publish(constant.EVENT.SEND, data)
  }

  const wssEvent = {
    /**
    *  发送用户消息
    *  data => {content: XXX}
    */
    sendText: ({ conversationId, content, tempId }) => sendMsg({ conversationId, content, messageTypeCode: constant.EVENT.TEXT, tempId }),
    sendImage: ({ conversationId, content, tempId }) => sendMsg({ conversationId, content, messageTypeCode: constant.EVENT.IMAGE, tempId }),
    sendAudio: ({ conversationId, content, tempId }) => sendMsg({ conversationId, content, messageTypeCode: constant.EVENT.AUDIO, tempId }),
    sendVideo: ({ conversationId, content, tempId }) => sendMsg({ conversationId, content, messageTypeCode: constant.EVENT.VIDEO, tempId }),


    /**
     * 接受客服消息
     */


    // 接受系统消息
    onReceiveSystem: (cb) => {
      return pubsub.subscribe(constant.EVENT.SYSTEM, data => {
        cb(data)
      })
    },
    // 接受文本消息
    onReceiveText: (cb) => {
      return pubsub.subscribe(constant.EVENT.TEXT, data => {
        cb(data)
      })
    },
    // 接受图片消息
    onReceiveImage: (cb) => {
      return pubsub.subscribe(constant.EVENT.IMAGE, data => {
        cb(data)
      })
    },
    // 接受音频消息
    onReceiveAudio: (cb) => {
      return pubsub.subscribe(constant.EVENT.AUDIO, data => {
        cb(data)
      })
    },
    // 接受视频消息
    onReceiveVideo: (cb) => {
      return pubsub.subscribe(constant.EVENT.VIDEO, data => {
        cb(data)
      })
    },
    // 接受机器人消息
    onReceiveRobot: cb => {
      return pubsub.subscribe(constant.EVENT.CHAT_ROBOT, data => {
        cb(data)
      })
    },

    // 邀请评价
    onReceiveSatisfaction: cb => {
      return pubsub.subscribe(constant.EVENT.SATISFACTION, data => {
        cb(data)
      })
    },

    /**
     * 收到操作消息
     */

    // 接受回调消息
    onReceiveCallback: (cb) => {
      return pubsub.subscribe(constant.EVENT.CALLBACK, data => {
        cb(data)
      })
    },
    // 接受弹框提示消息
    onReceivePop: (cb) => {
      return pubsub.subscribe(constant.EVENT.POP, data => {
        cb(data)
      })
    },
    // 接受文本提示消息
    onReceiveTip: (cb) => {
      return pubsub.subscribe(constant.EVENT.TIP, data => {
        cb(data)
      })
    },
    // 接受结束会话刷新通知
    onReceiveRefresh: cb => {
      return pubsub.subscribe(constant.EVENT.REFRESH, data => {
        cb(data)
      })
    },
    // 接受加入他人房间，需要关闭房间刷新通知
    onReceiveCloseRefresh: cb => {
      return pubsub.subscribe(constant.EVENT.CLOSE_ROOM, data => {
        cb(data)
      })
    },

    // 新客服接入通知
    onReceiveNewCustomer: cb => {
      return pubsub.subscribe(constant.EVENT.NEW_CUSTOMER, data => {
        cb(data)
      })
    },
    // 接受结束会话通知
    onReceiveEndChat: (cb) => {
      return pubsub.subscribe(constant.EVENT.END_CHAT, data => {
        cb(data)
      })
    },


    /**
     * 前端自定义的事件
     */

    // socket连接
    onReceiveStart: cb => {
      return pubsub.subscribe(constant.EVENT.START, data => {
        cb(data)
      })
    },
    // socket断开
    onReceiveDestory: cb => {
      return pubsub.subscribe(constant.EVENT.DESTORY, data => {
        cb(data)
      })
    },
    // 前端发送消息
    onReceiveSend: cb => {
      return pubsub.subscribe(constant.EVENT.SEND, data => {
        cb(data)
      })
    },
    // 上线
    onReceiveOnline: cb => {
      return pubsub.subscribe(constant.EVENT.ONLINE, data => {
        cb(data)
      })
    },
    // 下线
    onReceiveOffline: cb => {
      return pubsub.subscribe(constant.EVENT.OFFLINE, data => {
        cb(data)
      })
    },
    // 转交
    onReceiveTransfer: cb => {
      return pubsub.subscribe(constant.EVENT.TRANSFER, data => {
        cb(data)
      })
    },

    unReceive: (events) => {
      if (!events) {
        throw new Error('events不能为空')
      }
      events.map(event => {
        (function () {
          pubsub.unsubscribe(event)
        })(event)
      })
    },

    /**
     * 触发事件
     */
    start: data => {
      pubsub.publish(constant.EVENT.START, data)
    },
    destory: data => {
      pubsub.publish(constant.EVENT.DESTORY, data)
    },
    online: (data) => {
      pubsub.publish(constant.EVENT.ONLINE, data)
    },
    offline: (data) => {
      pubsub.publish(constant.EVENT.OFFLINE, data)
    },
    close: () => {
      pubsub.publish(constant.EVENT.CLOSE, { type: 'manual', reason: constant.REASON.MANUAL })
    },
    endChat: () => {
      pubsub.publish(constant.EVENT.END_CHAT)
    },
    transfer: () => {
      pubsub.publish(constant.EVENT.TRANSFER)
    },




    // ipcc
    // 刷新通话列表
    refreshIpcc: cb => {
      pubsub.subscribe(constant.IPCC_TYPE.REFRESH, data => {
        cb(data)
      })
    },

    // 签入
    onReceiveSignIn: cb => {
      pubsub.subscribe(constant.IPCC_TYPE.SIGN_IN, data => {
        cb(data)
      })
    },

    // 签出
    onReceiveSignOut: cb => {
      pubsub.subscribe(constant.IPCC_TYPE.SIGN_OUT, data => {
        cb(data)
      })
    },

    // 通话中
    onReceiveCalling: cb => {
      pubsub.subscribe(constant.IPCC_TYPE.CALLING, data => {
        cb(data)
      })
    },

    // 挂断
    onReceiveHangUp: cb => {
      pubsub.subscribe(constant.IPCC_TYPE.HANG_UP, data => {
        cb(data)
      })
    },

    // 刷新通话列表
    onReceiveRefresh: cb => {
      pubsub.subscribe(constant.IPCC_TYPE.REFRESH, data => {
        cb(data)
      })
    },

  }

  return wssEvent
}
