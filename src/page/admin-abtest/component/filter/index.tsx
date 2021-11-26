/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:44
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:31:18
 * @Description:
 */
import { IFilter } from '../../types'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { Space, Input, Button } from '@arco-design/web-react'

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
          <div className="title">{t('page.adminABTest.filter.origin')}</div>
          <Input
            onChange={(e) => {
              updateFilter('origin', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="name">{t('page.adminABTest.filter.method')}</div>
          <Input
            onChange={(e) => {
              updateFilter('method', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminABTest.filter.comment')}</div>
          <Input
            onChange={(e) => {
              updateFilter('comment', e)
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
