/*
 * @Author: legends-killer
 * @Date: 2021-11-23 14:42:50
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 17:51:51
 * @Description:
 */
import { IFilter, ELogLevel, ELogType } from '../../types'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Space,
  Input,
  Button,
  Select,
  DatePicker,
} from '@arco-design/web-react'
import moment from 'moment'

const RangePicker = DatePicker.RangePicker

interface IProps {
  filter: IFilter
  setFilter: (filter: IFilter) => void
  handleSearch: () => void
}
export default function LogFilter(props: IProps) {
  const { filter, setFilter, handleSearch } = props
  const { t } = useTranslation()

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
      <div
        className="input-wrapper"
        style={{ width: '100%', marginBottom: 10 }}
      >
        <div className="title">{t('page.adminLog.filter.filter')}</div>
        <Input
          style={{ width: '100%' }}
          onChange={(e) => {
            updateFilter('filter', e)
          }}
        />
      </div>
      <Space wrap size={[15, 10]}>
        <div className="input-wrapper">
          <div className="title">{t('page.adminLog.filter.type.title')}</div>
          <Select
            style={{ width: 200 }}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'bl',
            }}
            value={filter.type}
            onChange={(val) => updateFilter('type', val)}
          >
            {Object.keys(ELogType).map((key) => {
              return (
                <Select.Option key={key} value={key}>
                  {t(`page.adminLog.filter.type.${key}` as any)}
                </Select.Option>
              )
            })}
          </Select>
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminLog.filter.level.title')}</div>
          <Select
            allowClear
            style={{ width: 200 }}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'bl',
            }}
            value={filter.level}
            onChange={(val) => updateFilter('level', val)}
          >
            {Object.keys(ELogLevel).map((key) => {
              return (
                <Select.Option key={key} value={key}>
                  {t(
                    `page.adminLog.filter.level.${key.toLocaleLowerCase()}` as any
                  )}
                </Select.Option>
              )
            })}
          </Select>
        </div>
        <div className="input-wrapper">
          <div className="title">{t('page.adminLog.filter.date')}</div>
          <RangePicker
            showTime
            disabledDate={(current) => {
              if (filter.date) {
                const picker = current?.format('YYYY-MM-DD')
                const picked = moment(filter.date).format('YYYY-MM-DD')
                return picked !== picker
              }
              return !moment().endOf('day').isAfter(moment(current?.toDate()))
            }}
            onOk={(date) => {
              setFilter({
                ...filter,
                timeFrom: moment(date[0]).format('YYYY-MM-DD HH:mm:ss'),
                timeTo: moment(date[1]).format('YYYY-MM-DD HH:mm:ss'),
              })
            }}
            onSelect={(date) => {
              updateFilter('date', moment(date[0]).format('YYYY-MM-DD'))
            }}
            onClear={() => {
              setFilter({
                ...filter,
                timeFrom: undefined,
                timeTo: undefined,
                date: undefined,
              })
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
