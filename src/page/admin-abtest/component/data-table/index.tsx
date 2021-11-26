/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:36
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:31:44
 * @Description:
 */
import { IAdminABTest, EDrawerUseType } from '../../types'
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useMemo } from 'react'
import { Table, Button, Message, Progress } from '@arco-design/web-react'
import GroupDrawer from '../drawer'
import moment from 'moment'
import style from './style.module.less'

interface IProps {
  data: IAdminABTest[]
  total: number
  loading: boolean
  fetchData: () => void
}
export default function DataTable(props: IProps) {
  const { data, total, loading, fetchData } = props
  const { t } = useTranslation()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selected, setSelected] = useState<IAdminABTest>()
  const [drawerUsage, setDrawerUsage] = useState<EDrawerUseType>(
    EDrawerUseType.CREATE
  )

  const columns = useMemo(() => {
    return [
      {
        title: t('page.adminABTest.table.id'),
        dataIndex: 'id',
        width: '80px',
      },
      {
        title: t('page.adminABTest.table.origin'),
        width: '250px',
        fixed: 'left' as any,
        render(col: number, item: any, index: number) {
          return (
            <div
              className={`${
                item.suspend ? style['suspend-test'] : style['under-test']
              }`}
            >
              {item.origin}
            </div>
          )
        },
      },
      {
        title: t('page.adminABTest.table.server'),
        dataIndex: 'server',
        width: '200px',
      },
      {
        title: t('page.adminABTest.table.dest'),
        dataIndex: 'dest',
        width: '250px',
      },
      {
        title: t('page.adminABTest.table.comment'),
        dataIndex: 'comment',
      },
      {
        title: t('page.adminABTest.table.current'),
        render: (col: number, item: any) => {
          return (
            <Progress
              percent={item.current}
              color={item.suspend ? '#C9CDD4' : ''}
              formatText={(val) => `${val} / 100`}
            />
          )
        },
        width: '150px',
      },
      {
        title: t('page.adminABTest.table.increase'),
        render: (col: number, item: any) => {
          return <>{item.increase + '%'}</>
        },
        width: '150px',
      },
      {
        title: t('page.adminABTest.table.timeGap'),
        dataIndex: 'timeGap',
        render: (col: number, item: any) => {
          return <>{item.timeGap + ' ' + t('common.hr')}</>
        },
        width: '150px',
      },
      {
        title: t('page.adminABTest.table.createdAt'),
        width: '200px',
        render: (col: number, item: IAdminABTest) => {
          return moment(item.createdAt).toDate().toLocaleString()
        },
      },
      {
        title: t('page.adminABTest.table.updatedAt'),
        width: '200px',
        render: (col: number, item: IAdminABTest) => {
          return moment(item.updatedAt).toDate().toLocaleString()
        },
      },
      {
        title: t('page.adminABTest.table.suspend'),
        dataIndex: 'suspend',
        width: '100px',
        render: (col: number, item: IAdminABTest): any => {
          return t(`common.${item.suspend ? 'yes' : 'no'}`)
        },
      },
      {
        title: t('page.adminABTest.table.method'),
        dataIndex: 'method',
        fixed: 'right' as any,
        width: '100px',
      },
    ]
  }, [t])

  // open drawer
  const onRow = useCallback((record: IAdminABTest) => {
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
        scroll={{ y: '50vh', x: 2000 }}
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
