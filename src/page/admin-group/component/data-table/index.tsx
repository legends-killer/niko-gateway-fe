/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:36
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-16 23:29:19
 * @Description:
 */
import { IAdminGroup, EDrawerUseType } from '../../types'
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useMemo } from 'react'
import { Table, Button, Message } from '@arco-design/web-react'
import GroupDrawer from '../drawer'
import moment from 'moment'

interface IProps {
  data: IAdminGroup[]
  total: number
  loading: boolean
  fetchData: () => void
}
export default function DataTable(props: IProps) {
  const { data, total, loading, fetchData } = props
  const { t } = useTranslation()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selected, setSelected] = useState<IAdminGroup>()
  const [drawerUsage, setDrawerUsage] = useState<EDrawerUseType>(
    EDrawerUseType.CREATE
  )

  const columns = useMemo(() => {
    return [
      {
        title: t('page.adminGroup.table.id'),
        dataIndex: 'id',
        width: '80px',
      },
      {
        title: t('page.adminGroup.table.name'),
        dataIndex: 'name',
      },
      {
        title: t('page.adminGroup.table.comment'),
        dataIndex: 'comment',
      },
      {
        title: t('page.adminGroup.table.default'),
        dataIndex: 'default',
        render: (col: number, item: IAdminGroup): any => {
          return t(`common.${item.default ? 'yes' : 'no'}`)
        },
      },
      {
        title: t('page.adminGroup.table.createdAt'),
        width: '200px',
        render: (col: number, item: IAdminGroup) => {
          return moment(item.createdAt).toDate().toLocaleString()
        },
      },
      {
        title: t('page.adminGroup.table.updatedAt'),
        width: '200px',
        render: (col: number, item: IAdminGroup) => {
          return moment(item.updatedAt).toDate().toLocaleString()
        },
      },
    ]
  }, [t])

  // open drawer
  const onRow = useCallback((record: IAdminGroup) => {
    return {
      onClick: () => {
        setSelected(record)
        setDrawerUsage(EDrawerUseType.MODIFY)
        setDrawerVisible(true)
      },
    }
  }, [])
  const onAdd = useCallback(() => {
    setSelected(undefined)
    setDrawerUsage(EDrawerUseType.CREATE)
    setDrawerVisible(true)
  }, [])

  return (
    <div>
      <Table
        scroll={{ y: '50vh' }}
        data={data}
        columns={columns}
        loading={loading}
        onRow={onRow}
        pagination={{
          total: total,
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
        }}
        renderPagination={(paginationNode) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Button size="mini" type="primary" onClick={onAdd}>
              {t('common.new')}
            </Button>
            {paginationNode}
          </div>
        )}
      />
      <GroupDrawer
        usage={drawerUsage}
        visible={drawerVisible}
        onClose={(refresh: boolean) => {
          setDrawerVisible(false)
          refresh && fetchData()
          refresh && Message.success(t('common.success'))
        }}
        data={selected}
      />
    </div>
  )
}
