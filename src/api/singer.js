import { commonParams, options } from './commonParams';
import jsonp from './jsonp';

export const getSingerList = async () => {
  let url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg"
  let data = Object.assign({}, commonParams, {
      channel:"singer",
      page:"list",
      key:"all_all_all",
      pagesize:100,
      pagenum:1,
      g_tk:5381,
      hostUid: 0,
      platform: "yqq",
      needNewCode:0
  })
  return jsonp(url, data, options)
}

export const getSingerDetail = async (singerId) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}