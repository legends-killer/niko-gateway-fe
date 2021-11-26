/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:51:22
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-17 21:08:33
 * @Description:
 */
import { useEffect, useState, useCallback } from 'react'
import DataTable from './component/data-table'
import Filter from './component/filter'
import { IFilter, IAdminBiz } from './types'
import { getBizList } from './api'
import { useTranslation } from 'react-i18next'
import { Card } from '@arco-design/web-react'

export default function AdminBiz() {
  const [filter, setFilter] = useState<IFilter>({})
  const { t } = useTranslation()
  const [data, setData] = useState<IAdminBiz[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await getBizList(filter)
    if (res.data) {
      setData(res.data.biz)
      setTotal(res.data.count)
    }
    setLoading(false)
  }, [filter])

  // init
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card title={t('page.adminBiz.title')} bordered={false}>
        <Filter
          filter={filter}
          setFilter={setFilter}
          handleSearch={fetchData}
        />
        <DataTable
          total={total}
          data={data}
          loading={loading}
          fetchData={fetchData}
        />
      </Card>
    </div>
  )
}
