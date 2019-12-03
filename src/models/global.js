import {
  get_user_self,
  get_customer,
  get_menu_list,
  get_menu_permission,
  check_is_agent,
  change_agent_status,
  change_ipcc_status,
  add_call,
  end_call,
  response_call,
  get_call_list,
  add_server_log,
  get_relate_customer_list,
} from '../service'
import { queryLanguage } from '@lib/language'

export default {
  namespace: 'app',
  state: {
    token: null,
    clientId: '',
    clientType: '',
    orgName: '',
    orgId: '',
    language: {},
    // menuList: [],
    listeners: []
  },
  reducers: {
    // 通用数据
    setAppReducer(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },

    // 多语言
    setLanuageReducer(state, { payload: { _module, res } }) {
      let language = { ...state.language }
      language[_module] = res
      return {
        ...state,
        language
      };
    },

    // 菜单
    setMenuListReducer(state, { payload }) {
      return {
        ...state,
        menuList: [...payload]
      };
    },

    // 选中菜单
    setMenuReducer(state, { payload }) {
      return {
        ...state,
        menu: { ...payload }
      };
    },

    // 菜单权限
    setMenuPermissionReducer(state, { payload }) {
      return {
        ...state,
        menuPermission: { ...payload }
      };
    },

    // socket事件器
    setWssEventReducer(state, { payload }) {
      return {
        ...state,
        wssEvent: { ...payload }
      };
    },

    // ipcc事件器
    setIpccReducer(state, { payload }) {
      return {
        ...state,
        ipcc: { ...payload }
      };
    },

    // 监听器队列
    setListenerReducer(state, { payload: { type } }) {
      let _listeners = [...state.listeners]

      if (!~_listeners.indexOf(type)) {
        _listeners.push(type)
      }
      return {
        ...state,
        listeners: _listeners
      }
    },

    // 设置账户信息
    setUserReducer(state, { payload }) {
      return {
        ...state,
        user: payload
      };
    },

    // 设置客服信息 头像/在线状态
    setCustomerReducer(state, { action, payload }) {
      switch (action) {
        // 初始化客服
        case 'init': {
          return {
            ...state,
            customer: { ...payload }
          }
        }
        // 修改客服状态
        case 'updateStatusCode': {
          let customer = { ...state.customer }
          customer.onlineStatusCode = payload
          return {
            ...state,
            customer
          }
        }
        // 修改客服语音状态
        case 'updateIpccStatusCode': {
          let customer = { ...state.customer, ipccStatusCode: payload }
          return {
            ...state,
            customer
          }
        }
        default: {
          return {
            ...state
          }
        }
      }
    },

    // 设置来电通话信息
    setCallInfoReducer(state, { payload }) {
      console.log('red === ', payload)
      return {
        ...state,
        callInfo: payload
      }
    },

    // 设置客服基本信息 备注
    setCallListReducer(state, { action, payload }) {
      switch (action) {
        // 初始化客服
        case 'init': {
          return {
            ...state,
            recordList: payload
          }
        }
        default: {
          return {
            ...state
          }
        }
      }
    },

    // 设置当前选中的通话记录
    setCallReducer(state, { action, payload }) {

      function updateCallList(record) {
        let recordList = [...state.recordList]
        let index = recordList.findIndex(item => item.id === record.id)
        recordList[index] = record
        return recordList
      }


      switch (action) {
        // 初始化客服
        case 'init': {
          return {
            ...state,
            record: { ...payload }
          }
        }
        case 'updateRelateId': {
          let record = { ...state.record }
          record.relatedCustomerId = payload.relateId
          let recordList = updateCallList(record)
          return {
            ...state,
            record: { ...record },
            recordList: [...recordList],
          }
        }
        case 'updateRemark': {
          let record = { ...state.record }
          record.remark = payload.remark
          let recordList = updateCallList(record)
          return {
            ...state,
            record: { ...record },
            recordList: [...recordList],
          }
        }
        default: {
          return {
            ...state
          }
        }
      }
    },

     // 设置关联客户信息
     setRelateCustomerListReducer(state, { payload }) {
      return {
        ...state,
        relateCustomerList: payload
      }
    },
  },
  effects: {
    // 设置全局信息
    * setApp({ payload }, { put }) {
      yield put({
        type: 'setAppReducer',
        payload
      });
    },
    // 检查是否是客服
    * checkIsAgent({ payload: { orgId }, callback }, { call }) {
      const res = yield call(check_is_agent, orgId)
      typeof callback === 'function' && callback(res)
    },
    // 获取菜单列表
    * getMenuList({ payload: { orgId, type }, callback }, { call, put }) {
      const res = yield call(get_menu_list, orgId)
      yield put({
        type: 'setMenuListReducer',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 获取菜单权限
    * getMenuPermission({ payload: { orgId, type }, callback }, { call, put }) {
      const res = yield call(get_menu_permission, orgId)
      yield put({
        type: 'setMenuPermissionReducer',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },
    // 菜单选中
    * setMenu({ payload, callback }, { put }) {
      yield put({
        type: 'setMenuReducer',
        payload: payload
      });
      typeof callback === 'function' && callback(payload)
    },

    // 多语言查询
    * language({ payload: { module: _module, otherCode }, callback }, { call, put, select }) {
      let language = yield select(state => state.app.language)    //这里就获取到了当前state中的数据num
      let res = null
      if (language[_module]) {
        res = language[_module]
      } else {
        res = yield call(queryLanguage, _module, otherCode, language)
      }
      yield put({
        type: 'setLanuageReducer',
        payload: {
          _module,
          res
        }
      });
      typeof callback === 'function' && callback(res)
    },

    * setWssEvent({ payload, callback }, { put }) {
      yield put({
        type: 'setWssEventReducer',
        payload
      });
      typeof callback === 'function' && callback(payload)
    },

    * setIpcc({ payload, callback }, { put }) {
      yield put({
        type: 'setIpccReducer',
        payload
      });
      typeof callback === 'function' && callback(payload)
    },

    * setListener({ payload: { type }, callback }, { put }) {
      yield put({
        type: 'setListenerReducer',
        payload: {
          type
        }
      })
      typeof callback === 'function' && callback()

    },

    // 获取账户信息
    * getUserSelf({ payload: { orgId }, callback }, { call, put }) {
      const res = yield call(get_user_self, orgId)
      yield put({
        type: 'setUserReducer',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 获取客服信息
    * getCustomer({ payload: { orgId, employeeId }, callback }, { call, put }) {
      let res = yield call(get_customer, orgId, employeeId)
      yield put({
        type: 'setCustomerReducer',
        action: 'init',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 修改在线状态
    * chanageAgentStatus({ payload: { orgId, customerServiceId, statusCode }, callback }, { call, put }) {
      const res = yield call(change_agent_status, orgId, customerServiceId, statusCode)
      yield put({
        type: 'setCustomerReducer',
        action: 'updateStatusCode',
        payload: statusCode
      });
      typeof callback === 'function' && callback(res)
    },

    // 获取客服语音状态
    * chanageIpccAgentStatus({ payload: { orgId, customerServiceId, ipccStatusCode }, callback }, { call, put }) {
      const res = yield call(change_ipcc_status, orgId, customerServiceId, ipccStatusCode)
      yield put({
        type: 'setCustomerReducer',
        action: 'updateIpccStatusCode',
        payload: ipccStatusCode
      });
      typeof callback === 'function' && callback()
    },

    // 添加通话记录
    * addCall({ payload, callback }, { call, put }) {
      const res = yield call(add_call, payload)
      yield put({
        type: 'setCallInfoReducer',
        payload: res
      })
      typeof callback === 'function' && callback(res)
    },

    // 通话结束 更新记录
    * endCall({ payload: { orgId, callId, objectVersionNumber }, callback }, { call }) {
      const res = yield call(end_call, orgId, callId, objectVersionNumber)
      typeof callback === 'function' && callback(res)
    },

    // 通话接听
    * callResponse({ payload: { orgId, id }, callback }, { call }) {
      const res = yield call(response_call, orgId, id)
      typeof callback === 'function' && callback(res)
    },


    // 获取通话记录列表
    * getCallList({ payload, callback }, { call, put }) {
      const res = yield call(get_call_list, payload)
      yield put({
        type: 'setCallListReducer',
        action: 'init',
        payload: res
      });
      typeof callback === 'function' && callback(res)
    },

    // 设置选中通话记录
    * setCall({ payload, callback }, { put }) {
      yield put({
        type: "setCallReducer",
        action: "init",
        payload
      })
      typeof callback === 'function' && callback(payload)
    },

    // 更新关联id
    * updateCallRateId({ payload: { relateId }, callback }, { put, select }) {
      // let record = yield select(state => state.record)    // 获取state中的record
      yield put({
        type: "setCallReducer",
        action: "updateRelateId",
        payload: { relateId }
      })
      typeof callback === 'function' && callback(relateId)
    },

    // 添加服务小记
    * addServerLog({ payload: { orgId, id, remark }, callback }, { call, put }) {
      const res = yield call(add_server_log, orgId, id, remark)
      yield put({
        type: "setCallReducer",
        action: "updateRemark",
        payload: {
          remark
        }
      })
      typeof callback === 'function' && callback(res)
    },

     // 获取关联客户信息
     * getRelateCustomerList({ payload, callback }, { call, put }) {
      const res = yield call(get_relate_customer_list, payload)
      yield put({
        type: "setRelateCustomerListReducer",
        payload: res
      })
      typeof callback === 'function' && callback(res)
    },
  }
};
