/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:33:20
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:42:20
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
          <div className="title">{t('page.adminUser.search.id')}</div>
          <Input
            onChange={(e) => {
              updateFilter('id', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminUser.search.staffName')}</div>
          <Input
            onChange={(e) => {
              updateFilter('staffName', e)
            }}
          />
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminUser.search.staffId')}</div>
          <Input
            onChange={(e) => {
              updateFilter('staffId', e)
            }}
          />
        </div>
        <Button type="primary" onClick={handleSearch}>
          {t('page.adminUser.search.btn')}
        </Button>
      </Space>
    </div>
  )
}
