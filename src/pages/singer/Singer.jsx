import React from 'react'
import Confirm from '../../components/confirm/Comfirm'
import Switch from '../../components/switch/Switch'
import ProgressCircle from '../../components/progress-circle/ProgressCircle'
import ProgressBar from '../../components/progress-bar/ProgressBar'

class Singer extends React.Component {
  state = {
    visible: false
  }

  onOk = () => {
    this.setState({
      visible: false
    })
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    return (
      <div>
        <Confirm visible={this.state.visible} text="确定" onOk={this.onOk} onCancel={this.onCancel}/>
        <button onClick={() => {this.setState({visible: true})}}>打开</button>
        <Switch switches={['A', 'B']}></Switch>
        <ProgressCircle percent={0.6} />
        <ProgressBar />
      </div>
    )
  }
}

export default Singer