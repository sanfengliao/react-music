import React from 'react'
import { getRecommend } from '../../api/recommend';

class Recommend extends React.Component {
  componentDidMount() {
    getRecommend()
  }
  render() {
    return (
      <div>Recommend</div>
    )
  }
}

export default Recommend