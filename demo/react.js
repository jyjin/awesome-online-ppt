import React from 'react'
const axios = { get: () => { } }

export default class ShowName extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // your state ...
    }
  }

  componentWillMount() {

    // 获取用户名
    axios.get(`/get/my/name/10`, name => {
      this.setState({
        name
      })
    })

  }

  render() {
    return <div>
        我的名字： {this.state.name}
    </div>
  }
}