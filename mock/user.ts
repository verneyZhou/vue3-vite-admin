import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: (req, res) => {
        let {username, password} = req.query;
        return {
            code: 0,
            data: {
                username,
                password,
                admin_token: +new Date() + '',
                roles: [username]
            }
        }
      },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
        return {
            code: 0,
            flag: 1,
            data: {
                username: 'admin',
                password: '123456',
                avatar: 'https://img2.bosszhipin.com/boss/avatar/avatar_15.png',
                roles: ['admin'],                
            }
        }
      },
  },
  {
    url: '/api/user/logout',
    method: 'get',
    response: () => {
        return {
            code: 0,
            flag: 1,
            data: 'logout!!!'
        }
      },
  }
] as MockMethod[]
