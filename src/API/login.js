import http from '../utils/axios'

export const login = async (credentials) => {
  const response = await http('/auth/login/', {
    method: 'POST',
    data: credentials,
  })
  return response
}
