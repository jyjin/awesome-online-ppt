import style from './index.less'
import React from 'react'
import className from 'classnames'
import { connect } from 'dva'
import data from '../data'
import uuid from 'uuid'
import { siteUrl } from '@config'
import { Input, Button } from 'antd'
console.log('data.length == ', data.length)
let i = 0
while (i < data.length) {
  data[i]['id'] = uuid()
  i++
}


const mapStateToProps = state => {
  return {
    language: state.app.language,
  }
}

@connect(mapStateToProps)
class Shell extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
  }


  onSend(data) {
    this.setState({
      current: data
    }, () => {
    })
    this.refs.input.value = JSON.stringify(data, null, 2)
    window.socket.emit('cmd', data)
  }

  onBtnSub() {
    let { current } = this.state
    const index = current.content.findIndex(item => item.image !== undefined)
    if (~index) {
      let height = current.content[index].maxHeight.replace('calc(', '').replace('vh)', '')
      height = height * 1.0 - 5
      current.content[index].maxHeight = 'calc(' + height + 'vh)'
      current.scale = true
      window.socket.emit('cmd', current)
    }
  }

  onBtnAdd() {
    let { current } = this.state
    const index = current.content.findIndex(item => item.image)
    if (~index) {
      let height = current.content[index].maxHeight.replace('calc(', '').replace('vh)', '')
      height = height * 1.0 + 5
      current.content[index].maxHeight = 'calc(' + height + 'vh)'
      current.scale = true
      window.socket.emit('cmd', current)
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
    console.log(this.refs.input)
  }

  onBtnSend() {
    try {
      window.socket.emit('cmd', JSON.parse(this.state.value))
    } catch (e) {
      alert('内容格式不正确')
    }
  }

  onBtnHide(animination) {
    window.socket.emit('cmd', animination)
  }

  render() {



    return <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ width: '28%', padding: '0 1%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
        {data.map(item => {

          const itemStyle = className({
            [style['item']]: true,
            [style['current']]: this.state.current && item.id === this.state.current.id
          })

          if (item.list) {
            return <ul className={itemStyle} onClick={() => this.onSend(item)}>
              <>{item.content.map(content => {
                if (content.text) {
                  return <li>
                    <p key={content.text}>{content.text}</p>
                  </li>
                }
                if (content.image) {
                  return <li>
                    <img key={content.image} src={`${siteUrl}/assets/${content.image}`} style={{ display: 'block', maxHeight: '0.4rem' }} />
                  </li>
                }
              })}</>
            </ul>
          }

          return <div className={itemStyle} onClick={() => this.onSend(item)}>
            <>{item.content.map(content => {
              if (content.text) {
                return <>
                  <p key={content.text}>{content.text}</p>
                </>
              }
              if (content.image) {
                return <>
                  <img key={content.image} src={`${siteUrl}/assets/${content.image}`} style={{ display: 'block', maxHeight: '0.4rem' }} />
                </>
              }
            })}</>
          </div>
        })}
      </div>
      <div style={{ width: '72%', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '95%' }}>
          <textarea
            ref='input'
            key={'input'}
            onChange={val => { this.onChange(val) }}
            style={{ background: '#000', height: '50%', width: '90%', fontSize: '0.14rem', borderColor: '#ff6e18', color: '#ff6e18', padding: '5%', margin: '0.04rem', borderRadius: '0.1rem' }} />
          <Button style={{ display: 'block', margin: '5% 5% 0.2rem', width: '90%' }} type="primary" onClick={this.onBtnSend.bind(this)}>Send</Button>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={this.onBtnSub.bind(this)}>-</Button>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={this.onBtnAdd.bind(this)}>+</Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={() => this.onBtnHide('scaleRotateOut')}>scaleRotateOut</Button>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={() => this.onBtnHide('fadeOut')}>fadeOut</Button>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={() => this.onBtnHide('scaleOut')}>scaleOut</Button>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={() => this.onBtnHide('bounceOutRight')}>bounceOutRight</Button>
            <Button style={{ display: 'block', margin: '1%' }} type="primary" onClick={() => this.onBtnHide('bounceOutLeft')}>bounceOutLeft</Button>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Shell