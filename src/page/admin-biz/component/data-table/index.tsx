/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:36
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-22 22:39:51
 * @Description:
 */
import { IAdminBiz, EDrawerUseType, IGroup } from '../../types'
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { Table, Button, Message } from '@arco-design/web-react'
import { getAllGroup } from '../../api'
import GroupDrawer from '../drawer'
import moment from 'moment'

interface IProps {
  data: IAdminBiz[]
  total: number
  loading: boolean
  fetchData: () => void
}
export default function DataTable(props: IProps) {
  const { data, total, loading, fetchData } = props
  const { t } = useTranslation()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selected, setSelected] = useState<IAdminBiz>()
  const [drawerUsage, setDrawerUsage] = useState<EDrawerUseType>(
    EDrawerUseType.CREATE
  )
  const [group, setGroup] = useState<IGroup[]>([])

  const fetchGroupInfo = useCallback(async () => {
    const res = await getAllGroup()
    if (res.data) {
      setGroup(res.data.group)
    }
  }, [])

  const columns = useMemo(() => {
    return [
      {
        title: t('page.adminBiz.table.id'),
        dataIndex: 'id',
        width: '80px',
      },
      {
        title: t('page.adminBiz.table.name'),
        dataIndex: 'name',
        width: '150px',
        fixed: 'left' as any,
      },
      {
        title: t('page.adminBiz.table.comment'),
        dataIndex: 'comment',
        width: '200px',
      },
      {
        title: t('page.adminBiz.table.isPublic'),
        width: '80px',
        render: (col: number, item: IAdminBiz) => {
          return t(`common.${item.isPublic ? 'yes' : 'no'}`)
        },
      },
      {
        title: t('page.adminBiz.table.url'),
        dataIndex: 'url',
      },
      {
        title: t('page.adminBiz.table.api'),
        dataIndex: 'api',
      },
      {
        title: t('page.adminBiz.table.createdAt'),
        width: '200px',
        render: (col: number, item: IAdminBiz) => {
          return moment(item.createdAt).toDate().toLocaleString()
        },
      },
      {
        title: t('page.adminBiz.table.updatedAt'),
        width: '200px',
        render: (col: number, item: IAdminBiz) => {
          return moment(item.updatedAt).toDate().toLocaleString()
        },
      },
      {
        title: t('page.adminBiz.table.isOpen'),
        dataIndex: 'isOpen',
        fixed: 'right' as any,
        width: '80px',
        render: (col: number, item: IAdminBiz): any => {
          return t(`common.${item.isOpen ? 'on' : 'off'}`)
        },
      },
    ]
  }, [t])

  // open drawer
  const onRow = useCallback((record: IAdminBiz) => {
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

  //init
  useEffect(() => {
    fetchGroupInfo()
  }, [fetchGroupInfo])

  return (
    <div>
      <Table
        scroll={{ y: '50vh', x: 1500 }}
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
        group={group}
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
