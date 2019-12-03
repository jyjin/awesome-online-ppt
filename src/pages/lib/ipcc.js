import config from '@config'
import { message } from 'antd'
import { IPCC_TYPE } from '@constant'

const { isCallinAlert, isCalloutAlert } = config.maixin

export default ({ pubsub, extensionNumber, extensionPassword }, fnCallIn, fnCallOut) => {
  if (window.IccPhone) {
    // window.IccPhone.ready(function (P) {
    //   // alert('ready')
    // });

    window.tel = window.IccPhone.create('div[id="Icctel"]', {
      seatNo: extensionNumber,//工号
      seatExt: extensionNumber,//分机号
      seatPassWord: extensionPassword,//密码
      iccSerVicePath: config.maixinWss,//服务地址
      isCallinAlert,//呼入是否弹屏
      CallinFn: fnCallIn,//呼入弹频的方法(由对接方提供如上【test】参数tel)
      isCalloutAlert,//呼出是否弹屏
      CalloutFn: fnCallOut,//同呼入弹屏方法一样
      items: [
        'checkIn',
        'checkOut',
        // 'txtTel',
        // 'callTel',
        // 'dropTel',
        // 'threeCall', 
        // 'threeMeet', 
        // 'dialBack', 
        // 'threeTalk', 
        // 'killTalk', 
        // 'transSeatno', 
        // 'freeCall',
        // 'keepCall',
        // 'keepQuiet'
      ]//电话条组件(可自己根据权限或是顺序进行相对应的调整)
    });

    let lastMsg = ''

    // 通过改写sdk 获取状态码
    document.getElementById("ipcc_bridge") && (document.getElementById("ipcc_bridge").onchange = function (data, type) {


      const ignore = ['签入成功', '签出成功', '通话开始', '通话结束']
      ignore.map(item => {
        if (~data.indexOf(item) && lastMsg !== data) {
          message.success(data)
          lastMsg = data
        }
      })

      switch (type) {
        case IPCC_TYPE.SIGN_IN:
          pubsub.publish(IPCC_TYPE.SIGN_IN)
          break
        case IPCC_TYPE.SIGN_OUT:
          pubsub.publish(IPCC_TYPE.SIGN_OUT)
          break
        case IPCC_TYPE.CALLING:
          pubsub.publish(IPCC_TYPE.CALLING)
          break
        case IPCC_TYPE.HANG_UP:
          pubsub.publish(IPCC_TYPE.HANG_UP)
          break
        default:
          // console.log('no ipcc message type')
          break
      }

    })

    return {
      signIn: () => {
        document.getElementById('whfckIn') && document.getElementById('whfckIn').click()
      },
      signOut: () => {
        document.getElementById('whfchOut') && document.getElementById('whfchOut').click()
      },
    }
  }

}