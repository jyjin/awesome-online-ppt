import {
  get_room_list,
  set_room_read,
  remove_room,
  get_message_list,
  get_user_info,
  get_customer_info,
  update_customer_remark,
  get_service_order_info,
  get_transfer_list,
  transfer_conversation,
  save_evalute,
  invitate_evalute,
  get_employee,
} from '@service'

export default {
  namespace: 'chat',
  state: {

  },
  reducers: {
    // 设置客服基本信息 备注
    setCustomerInfoReducer(state, { action, payload }) {
      switch (action) {
        // 初始化客服
        case 'init': {
          return {
            ...state,
            customerInfo: payload
          }
        }
        default: {
          return {
            ...state
          }
        }
      }
    },

    // 设置房间列表
    setRoomListReducer(state, { action, payload }) {
      switch (action) {
        // 初始化客服
        case 'init': {
          return {
            ...state,
            roomList: [...payload]
          }
        }
        default: {
          return {
            ...state
          }
        }
      }
    },

    // 设置当前选中房间
    setRoomReducer(state, { action, payload }) {
      switch (action) {
        // 初始化客服
        case 'init': {
          console.log('set room ........')
          return {
            ...state,
            room: payload
          }
        }
        default: {
          return {
            ...state
          }
        }
      }
    },

    // 是否是历史房间
    setIsHistoryReducer(state, { payload }) {
      return {
        ...state,
        isHistory: payload
      }
    },

    // 设置服务单详情
    setServiceOrderInfoReducer(state, { payload }) {
      return {
        ...state,
        serviceOrderInfo: payload
      }
    },

    // 设置转接列表
    setTransferListReducer(state, { payload }) {
      return {
        ...state,
        transferList: payload
      }
    },

  },
  effects: {
    // 获取房间列表
    * getRoomList({ payload: { orgId, userName, isCurrent }, callback }, { call, put }) {
      const res = yield call(get_room_list, orgId, userName, isCurrent)
      yield put({
        type: 'setRoomListReducer',
        action: 'init',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 设置房间列表 覆盖
    * setRoomList({ payload, callback }, { put }) {
      yield put({
        type: 'setRoomListReducer',
        action: 'init',
        payload: payload
      });
      typeof callback === 'function' && callback(payload)
    },

    // 设置当前房间
    * setRoom({ payload, callback }, { put }) {
      yield put({
        type: 'setRoomReducer',
        action: 'init',
        payload
      });
      typeof callback === 'function' && callback(payload)
    },

    // 设置房间已读
    * setRoomRead({ payload: { orgId, conversationId }, callback }, { call }) {
      const res = yield call(set_room_read, orgId, conversationId)
      typeof callback === 'function' && callback(res)
    },

    // 删除房间
    * removeRoom({ payload: { orgId, conversationId, customerId }, callback }, { call }) {
      const res = yield call(remove_room, orgId, conversationId, customerId)
      typeof callback === 'function' && callback(res)
    },

    // 是否是历史房间
    * isHistory({ payload, callback }, { put }) {
      yield put({
        type: 'setIsHistoryReducer',
        payload
      });
      typeof callback === 'function' && callback(payload)
    },

    // 获取消息记录
    * getMessageList({ payload: { orgId, customerId, page, size, type }, callback }, { call }) {
      const res = yield call(get_message_list, orgId, customerId, page, size, type)
      typeof callback === 'function' && callback(res)
    },

    // 获取用户信息for头像
    * getUserInfo({ payload: { orgId, userId }, callback }, { call }) {
      const res = yield call(get_user_info, orgId, userId)
      typeof callback === 'function' && callback(res)
    },

    // 获取客服信息
    * getCustomerInfo({ payload: { orgId, customerId }, callback }, { call, put }) {
      const res = yield call(get_customer_info, orgId, customerId)
      yield put({
        action: 'init',
        type: 'setCustomerInfoReducer',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 更新客服备注
    * updateCustomerRemark({ payload: { orgId, employeeId, remark }, callback }, { call }) {
      const res = yield call(update_customer_remark, orgId, employeeId, remark)
      typeof callback === 'function' && callback(res)
    },

    // 获取服务单信息
    * getServiceOrderInfo({ payload: { orgId, customerId, agentId }, callback }, { call, put }) {
      const res = yield call(get_service_order_info, orgId, customerId, agentId)
      yield put({
        type: 'setServiceOrderInfoReducer',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 获取转接列表
    * getTransferList({ payload: { orgId, condition, employeeId }, callback }, { call, put }) {
      const res = yield call(get_transfer_list, orgId, condition, employeeId)
      yield put({
        type: 'setTransferListReducer',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 获取转接列表
    * transferConversation({ payload: { orgId, remark, conversationId, forwarderUserId, receiverUserId }, callback }, { call }) {
      const res = yield call(transfer_conversation, orgId, remark, conversationId, forwarderUserId, receiverUserId)
      typeof callback === 'function' && callback(res)
    },

    // 更新访客备注
    * updateCustomerMark({ payload: { orgId, employeeId, remark }, callback }, { call }) {
      const res = yield call(update_customer_remark, orgId, employeeId, remark)
      typeof callback === 'function' && callback(res)
    },

    // 保存评价
    * saveEvaluate({ payload: { orgId, conversationId, description, remark, score }, callback }, { call }) {
      const res = yield call(save_evalute, orgId, conversationId, description, remark, score)
      typeof callback === 'function' && callback(res)
    },

    // 邀请评价
    * invitateEvaluate({ payload: { orgId, conversationId }, callback }, { call }) {
      const res = yield call(invitate_evalute, orgId, conversationId)
      typeof callback === 'function' && callback(res)
    },

    // 邀请评价
    * getEmployee({ payload: { orgId, userId }, callback }, { call }) {
      const res = yield call(get_employee, orgId, userId)
      typeof callback === 'function' && callback(res)
    },

  }
};
