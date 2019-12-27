import MockAdapter from 'axios-mock-adapter'

const mockInit = (axiosInstance) => {
  var mock = new MockAdapter(axiosInstance)

  mock.onGet('/login').reply(200, {
    err: null,
    msg: 'login success',
    token: 'tokentokentoken',
    userInfo: {
      id: 'kkkkkk',
      name: 'lasdlf'
    }
  })
}

export default mockInit
