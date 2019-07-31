import ajax from './ajax'
import { commonParams } from './commonParams';

export const getRecommend = async () => {
  let data = Object.assign({},commonParams, {
    _: Date.now(),
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return ajax('/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', data)
}