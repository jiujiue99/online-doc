
const noMessageUrls = ['login']

export function handleResponse(res) {
  const resData = res.data
  if (resData) {
    if (resData.err && !noMessageUrls.some(url => res.config.url.match(url))) {
      window.snackBarStore.showMessage({ message: resData.err, type: 'warning' })
    }
    return resData.data
  }
  return null
}

