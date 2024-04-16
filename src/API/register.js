import http from '../utils/axios'
const register = async (reqBody) => {
  const res = await http('/auth/register', {
    method: 'POST',
    data: {
      ...reqBody,
    },
  })
  return res
}

export default register
