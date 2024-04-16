import http from '../utils/axios'

export const verifyEmailHttp = async (email) => {
  const response = await http('/auth/verify/', {
    method: 'POST',
    data: { email },
  })
  return response
}
