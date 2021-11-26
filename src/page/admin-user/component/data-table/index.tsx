/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:34:00
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:41:58
 * @Description:
 */
import { IAdminUser, IPage, IGroup } from '../../types'
import { Button, Message, PaginationProps, Table } from '@arco-design/web-react'
import {
  useCallback,
  useMemo,
  MutableRefObject,
  useState,
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import UserDrawer from '../drawer'
import { getAllGroup } from '../../api'
import AddToGroup from './add-to-group'

interface IProps {
  loading: boolean
  data: IAdminUser[]
  total: number
  onPageChange: (page: PaginationProps) => void
  paginate: MutableRefObject<IPage>
  fetchData: () => void
}

export default function DataTable(props: IProps) {
  const { t } = useTranslation()
  const { loading, data, total, paginate, onPageChange, fetchData } = props
  const [selected, setSelected] = useState<IAdminUser>()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [group, setGroup] = useState<IGroup[]>([])
  const [checkedRowKeys, setCheckedRowKeys] = useState<Array<string | number>>(
    []
  )
  const [modalVisible, setModalVisible] = useState(false)

  const fetchGroupInfo = useCallback(async () => {
    const res = await getAllGroup()
    if (res.data) {
      setGroup(res.data.group)
    }
  }, [])
  const onCell = useCallback((record: IAdminUser, index: number) => {
    return {
      onClick: () => {
        setDrawerVisible(true)
        setSelected(record)
      },
    }
  }, [])

  const columns = useMemo(() => {
    return [
      {
        title: t('page.adminUser.table.id'),
        dataIndex: 'id',
        onCell: onCell,
      },
      {
        title: t('page.adminUser.table.staffName'),
        dataIndex: 'staffName',
        onCell: onCell,
      },
      {
        title: t('page.adminUser.table.staffId'),
        dataIndex: 'staffId',
        onCell: onCell,
      },
    ]
  }, [onCell, t])
  const onChange = useCallback(
    (pagination: PaginationProps) => {
      onPageChange(pagination)
    },
    [onPageChange]
  )

  // init
  useEffect(() => {
    fetchGroupInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Table
        rowKey="id"
        scroll={{ y: '60vh' }}
        data={data}
        columns={columns}
        loading={loading}
        pagination={{
          total: total,
          pageSize: paginate.current.ipp,
          current: paginate.current.page,
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          sizeOptions: [10, 20, 50, 100, 200, 500, 1000],
        }}
        rowSelection={{
          type: 'checkbox',
          fixed: true,
          selectedRowKeys: checkedRowKeys,
          onChange: (selectedRowKeys) => {
            setCheckedRowKeys(selectedRowKeys)
          },
        }}
        onChange={onChange}
        renderPagination={(paginationNode) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <div>
              {checkedRowKeys.length > 0 && (
                <Button
                  type="primary"
                  size="mini"
                  onClick={() => {
                    setModalVisible(true)
                  }}
                >
                  {t('page.adminUser.popUp.btn')}
                </Button>
              )}
            </div>
            {paginationNode}
          </div>
        )}
      />
      <AddToGroup
        visible={modalVisible}
        onClose={(refresh: boolean) => {
          refresh && fetchData()
          refresh && Message.success(t('common.success'))
          setModalVisible(false)
        }}
        users={checkedRowKeys}
        groups={group}
      />
      <UserDrawer
        group={group}
        visible={drawerVisible}
        onClose={(refresh: boolean) => {
          refresh && fetchData()
          refresh && Message.success(t('common.success'))
          setDrawerVisible(false)
        }}
        data={selected}
      />
    </div>
  )
}
