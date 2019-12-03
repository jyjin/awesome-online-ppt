import style from './index.less'
import io from 'socket.io-client'
import React from 'react'
import {siteUrl} from '@config'
import '../pages/style/antd.css'
import '../pages/style/style.css'

class Layout extends React.Component {

  componentWillMount() {
    var socket = io(`${siteUrl}?token=jyjin`)
    window.socket = socket
  }

  render() {
    return <div className={style['panel']}>
      {this.props.children}
    </div>
  }
}

export default Layout