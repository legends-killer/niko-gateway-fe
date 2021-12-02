/*
 * @Author: legends-killer
 * @Date: 2021-12-02 14:52:40
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-02 14:52:55
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'

export const checkToken = async () => {
  return await apiRequestAsync.get<{ ok: boolean }>('/info/checkToken', {})
}
