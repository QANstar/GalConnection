import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) // 相对时间
dayjs.locale('zh-cn') // 使用本地化语言

// 显示相对时间,超过一个月显示年月日
export function getRelativeTime (time: number) {
  if (Date.now() - time > 1000 * 60 * 60 * 24 * 30) {
    return dayjs(new Date(time)).format('YYYY-MM-DD')
  } else return dayjs(time).fromNow().replace(' ', '')
}

// 格式化时间
export function formatTime (time: number) {
  return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
}

// 格式化无秒时间
export function formatTimeNoSecond (time: number) {
  return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm')
}
