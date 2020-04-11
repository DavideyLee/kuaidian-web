import DateFormat from 'plugins/date'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Date.prototype.$DateFormat = DateFormat
}

export default {
  install
}
