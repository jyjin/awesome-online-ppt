import { get, put, post } from '../pages/lib/ajax'
import { getV0 } from '../pages/lib/ajax.v0'
import { mock } from '@config'

// 获取菜单列表
export const get_menu_list = orgId => get(`/im-manage/v1/${orgId}/im/menu`, null, mock)

// 获取菜单权限
export const get_menu_permission = orgId => get(`/im-manage/v1/${orgId}/im/menu/checkPermission`, null, mock)

// 检查是否是客服
export const check_is_agent = orgId => get(`/im-manage/v1/${orgId}/im/customer/check/show`, null, mock)

// 获取账户信息
export const get_user_self = orgId => getV0(`/iam/v1/users/self`, { organizationId: orgId }, mock)

// 获取客服信息
export const get_customer = (orgId, employeeId) => getV0(`/im-manage/v1/${orgId}/im/customer/service`, { employeeId }, mock)

// 修改客服上线状态
export const change_agent_status = (orgId, customerServiceId, statusCode) => put(`/im-manage/v1/${orgId}/im/customer/switch/status`, { customerServiceId, statusCode }, mock)

// 修改坐席分机上线状态
export const change_ipcc_status = (orgId, customerServiceId, statusCode) => put(`/im-manage/v1/${orgId}/im/customer/ipcc/switch/status`, { customerServiceId, statusCode }, mock)

// 获取房间列表
export const get_room_list = (orgId, userName, isCurrent) => get(`/im-manage/v1/${orgId}/im/agent/conversion/list`, { userName, isCurrent }, mock)

// 设置房间已读
export const set_room_read = (orgId, conversationId) => post(`/im-manage/v1/${orgId}/im/agent/read/${conversationId}`, null, mock)

// 删除房间
export const remove_room = (orgId, conversationId, customerId) => put(`/im-manage/v1/${orgId}/im/agent/remove`, { conversationId, customerId }, mock)

// 获取消息记录
export const get_message_list = (orgId, customerId, page, size, type) => get(`/im-manage/v1/${orgId}/im/agent/conversion/page/message?customerId=${customerId}&page=${page}&size=${size}&type=${type}`, null, mock)

// 获取用户信息for头像
export const get_user_info = (orgId, userId) => getV0(`/iam/v1/organizations/${orgId}/users/${userId}`, null, mock)

// 获取客服信息
export const get_customer_info = (orgId, customerId) => getV0(`/fnd/v1/${orgId}/organizations/employee/detail/${customerId}`, null, mock)

// 更新客服备注
export const update_customer_remark = (orgId, employeeId, remark) => post(`/fnd/v1/${orgId}/organizations/employee/${employeeId}/remark`, { orgId, employeeId, remark }, mock)

// 获取服务单信息
export const get_service_order_info = (orgId, customerId, agentId) => get(`/itsm/v1/${orgId}/organizations/event/v2/im/custom/service`, { orgId, customerId, agentId }, mock)

// 获取转接列表
export const get_transfer_list = (orgId, condition, employeeId) => getV0(`/im-manage/v1/${orgId}/im/customer/aliveConNum`, { condition, employeeId }, mock)

// 转接
export const transfer_conversation = (orgId, remark, conversationId, forwarderUserId, receiverUserId) => post(`/im-manage/v1/${orgId}/im/conversation/transfer/insert`, { remark, conversationId, forwarderUserId, receiverUserId }, mock)

// 保存评价
export const save_evalute = (orgId, conversationId, description, remark, score) => post(`/im-manage/v1/${orgId}/im/agent/save/appraisal`, { conversationId, description, remark, iamOrganizationId: orgId, score }, mock)

// 邀请评价
export const invitate_evalute = (orgId, conversationId) => put(`/im-manage/v1/${orgId}/im/agent/invitation/appraisal?conversationId=${conversationId}`, null, mock)

// 新增通话记录
export const add_call = data => post(`/im-manage/v1/${data.orgId}/im/call/record/insert`, data, mock)

// 通话结束更新会话
export const end_call = (orgId, callId, objectVersionNumber) => post(`/im-manage/v1/${orgId}/im/call/record/call/end?callId=${callId}&objectVersionNumber=${objectVersionNumber}`, null, mock)

// 通话接听
export const response_call = (orgId, id) => put(`/im-manage/v1/${orgId}/im/call/record/pickup/${id}`, null, mock)

// 获取通话记录列表
export const get_call_list = (data) => get(`/im-manage/v1/${data.orgId}/im/call/record/list`, data, mock)

// 获取通话基本信息
export const get_call_info = (orgId, callId, phone) => get(`/im-manage/v1/${orgId}/callinfo`, { callId, phone }, mock)

// 获取待关联客户列表
export const get_relate_customer_list = data => get(`/fnd/v1/${data.orgId}/customer/info/info/condition`, data, mock)

// 获取关联客户详情
export const get_relate_customer_detail = (orgId, id) => get(`/fnd/v1/${orgId}/customer/info/id/info`, { id }, mock)

// 获取客户通话记录
export const get_customer_record_list = (data) => get(`/im-manage/v1/${data.orgId}/im/call/record/customer/${data.customerId}`, data, mock)

// 获取在线服务记录列表
export const get_online_server_list = (data) => get(`/im-manage/v1/${data.orgId}/im/agent/employee/conversion/${data.employeeId}`, data, mock)

// 关联账户
export const bind_account = (orgId, customerId, id) => put(`/im-manage/v1/${orgId}/im/call/record/binding/customer`, { customerId, id }, mock)

// 取消关联
export const unbind_account = (orgId, id) => put(`/im-manage/v1/${orgId}/im/call/record/unbinding/customer`, { id }, mock)

// 更新通话状态
export const update_call_status = (orgId, id) => put(`/im-manage/v1/${orgId}/im/call/record/update/status`, { id }, mock)

// 获取相关服务单
export const get_relate_service_order_list = (orgId, data) => get(`/itsm/v1/${orgId}/organizations/event/v2/im/custom/service/page`, data, mock) // data: {agentId, customerId}

// 获取自定义字段的配置
export const get_custom_field_config = (orgId) => get(`/fnd/v1/${orgId}/customer/info/ext/config`, null, mock)

// 新增扩展字段
export const add_custom_field = (orgId, data) => post(`/fnd/v1/${orgId}/customer/info/ext/value/insert`, data, mock)

// 更新扩展字段 （包括标志位删除）
export const update_custom_field = (orgId, data) => post(`/fnd/v1/${orgId}/customer/info/ext/value/update`, data, mock)

// 添加服务小记
export const add_server_log = (orgId, id, remark) => put(`/im-manage/v1/${orgId}/im/call/record/detail/${id}`, { remark }, mock)

// 获取员工信息 为了头像
export const get_employee = (orgId, userId) => getV0(`/fnd/v1/${orgId}/organizations/employee/user/${userId}`, null, mock)