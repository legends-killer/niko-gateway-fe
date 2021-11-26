/*
 * @Author: legends-killer
 * @Date: 2021-11-14 19:31:40
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-16 15:14:23
 * @Description:
 */
import { Card, PaginationProps } from '@arco-design/web-react'
import Filter from './component/filter'
import DataTable from './component/data-table'
import { IFilter, IPage, IAdminApi } from './types'
import { useCallback, useState, useEffect, useRef } from 'react'
import { getAdminApi } from './api'
import { useTranslation } from 'react-i18next'

const defalutPaginate = {
  page: 1,
  ipp: 10,
} as IPage

export default function AdminApi() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<IFilter>({})
  const paginate = useRef<IPage>(defalutPaginate)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [data, setData] = useState<IAdminApi[]>([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const params = { ...filter, ...paginate.current }
    const res = await getAdminApi(params)
    if (res.data) {
      setData(res.data.api)
      setTotal(res.data.count)
    }
    setLoading(false)
  }, [filter, paginate])

  const onPageChange = useCallback(
    async (p: PaginationProps) => {
      paginate.current = {
        page: p.current || 1,
        ipp: p.pageSize || 10,
      }
      await fetchData()
    },
    [fetchData]
  )

  //init
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card title={t('page.adminApi.title')} bordered={false}>
        <Filter
          filter={filter}
          setFilter={setFilter}
          handleSearch={fetchData}
        />
        <DataTable
          total={total}
          data={data}
          loading={loading}
          onPageChange={onPageChange}
          paginate={paginate}
          fetchData={fetchData}
        />
      </Card>
    </div>
  )
}
