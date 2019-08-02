import ajax from './ajax'
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