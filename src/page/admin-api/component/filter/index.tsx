/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:33:20
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:34:02
 * @Description:
 */
import { IFilter } from '../../types'
import { useCallback } from 'react'
import { Space, Input, Button } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'

interface IProps {
  filter: IFilter
  setFilter: (filter: IFilter) => void
  handleSearch: () => void
}

export default function Filter(props: IProps) {
  const { t } = useTranslation()
  const { filter, setFilter, handleSearch } = props
  const updateFilter = useCallback(
    (key: string, val: string | number) => {
      setFilter({
        ...filter,
        [key]: val,
      })
    },
    [filter, setFilter]
  )

  return (
    <div>
      <Space wrap size={[15, 10]}>
        <div className="input-wrapper">
          <div className="title">{t('page.adminApi.filter.comment')}</div>
          <Input
            onChange={(e) => {
              updateFilter('comment', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminApi.filter.origin')}</div>
          <Input
            onChange={(e) => {
              updateFilter('origin', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminApi.filter.server')}</div>
          <Input
            onChange={(e) => {
              updateFilter('server', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminApi.filter.dest')}</div>
          <Input
            onChange={(e) => {
              updateFilter('dest', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminApi.filter.method')}</div>
          <Input
            onChange={(e) => {
              updateFilter('method', e)
            }}
          />
        </div>
        <Button type="primary" onClick={handleSearch}>
          {t('common.search')}
        </Button>
      </Space>
    </div>
  )
}
