import style from './index.less'
import React from 'react'
import className from 'classnames'
import { connect } from 'dva'
import { siteUrl } from '@config'

const mapStateToProps = state => {
  return {
    language: state.app.language,
    customer: state.app.customer,
  }
}

@connect(mapStateToProps)
class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {

    window.socket.on('cmd_server', data => {
      console.log('data == ', data)

      // 清屏动画
      if (typeof data === 'string') {
        this.setState({
          come: false,
          out: data
        })
        return
      }

      // 图片缩放
      if (data.scale) {
        this.setState({
          data
        })
        return
      }

      // 第一次 直接设置进入动画
      if (!this.state.data) {
        this.setState({
          data
        })
        setTimeout(() => {
          this.setState({
            come: data.in,
            out: false,
          })
        }, 300)
      } else {
        // 上一内容退出
        this.setState({
          come: false,
          out: data.out,
        }, () => {
          // 更新内容
          setTimeout(() => {
            this.setState({
              data,
            }, () => {
              // 设置进入
              setTimeout(() => {
                this.setState({
                  come: data.in,
                  out: false
                })
              }, 300)
            })

          }, 300)
        })

      }



    })
  }



  render() {


    const { data, come, out } = this.state
    const body = className(style['body'])


    const base = {
      [style['ppt']]: true
    }

    if (come) {
      base[style[come]] = true
    }

    if (out) {
      base[style[out]] = true
    }

    const ppt = className(base)

    if (!data) {
      return <div className={body}>
        <div>
          即将呈现...
        </div>
      </div>
    }

    if (data.list) {
      return <div className={body}>
        <ul className={style['ul']}>{data.content.map((content, index) => {
          if (content.text) {
            return <li key={data.id + index} className={ppt} style={{ textAlign: content.textAlign || 'left' }}>
              <p key={content.text} dangerouslySetInnerHTML={{ __html: content.text }}></p>
            </li>
          }
          if (content.image) {
            return <li key={data.id + index} className={ppt}>
              <img key={content.image} src={`${siteUrl}/assets/${content.image}`} style={{ display: 'block', maxHeight: content.maxHeight || '0.4rem' }} />
            </li>
          }
        })}</ul>
      </div>
    }



    return <div className={body}>
      <div className={ppt}>
        {data.content.map((content, index) => {
          if (content.text) {
            return <>
              <p key={data.id + index} style={{ margin: "0.2rem", textAlign: content.textAlign || 'center' }} dangerouslySetInnerHTML={{ __html: content.text }}></p>
            </>
          }
          if (content.image) {
            return <>
              <img key={data.id + index} src={`${siteUrl}/assets/${content.image}`} style={{ display: 'block', maxHeight: content.maxHeight || 'calc(50vh)', margin: "0.2rem", textAlign: content.right ? "right" : 'center' }} />
            </>
          }
        })}
      </div>
    </div>
  }
}

export default Home