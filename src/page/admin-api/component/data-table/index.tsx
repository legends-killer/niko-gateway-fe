/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:34:00
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:32:52
 * @Description:
 */
import {
  IAdminApi,
  IPage,
  EDrawerUseType,
  IGroup,
  IAdminBiz,
} from '../../types'
import {
  Button,
  Message,
  PaginationProps,
  Table,
  Tag,
} from '@arco-design/web-react'
import {
  useCallback,
  useMemo,
  MutableRefObject,
  useState,
  useEffect,
} from 'react'
import { getAllGroup, getAllBiz } from '../../api'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import ApiDrawer from '../drawer'
import style from './style.module.less'

interface IProps {
  loading: boolean
  data: IAdminApi[]
  total: number
  onPageChange: (page: PaginationProps) => void
  paginate: MutableRefObject<IPage>
  fetchData: () => void
}

export default function DataTable(props: IProps) {
  const { t, i18n } = useTranslation()
  const { loading, data, total, paginate, onPageChange, fetchData } = props
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selected, setSelected] = useState<IAdminApi>()
  const [drawerUsage, setDrawerUsage] = useState<EDrawerUseType>(
    EDrawerUseType.CREATE
  )
  const [group, setGroup] = useState<IGroup[]>([])
  const [biz, setBiz] = useState<IAdminBiz[]>([])

  const fetchGroupInfo = useCallback(async () => {
    const res = await getAllGroup()
    if (res.data) {
      setGroup(res.data.group)
    }
  }, [])
  const fetchBizInfo = useCallback(async () => {
    const res = await getAllBiz()
    res.data && setBiz(res.data.biz)
  }, [])

  const columns = useMemo(() => {
    return [
      {
        title: t('page.adminApi.table.comment'),
        dataIndex: 'comment',
        width: '10%',
      },
      {
        title: t('page.adminApi.table.origin'),
        dataIndex: 'origin',
        width: '15%',
        fixed: 'left' as any,
        render: (col: number, item: any, index: number) => {
          return (
            <div className={`${item.abTest ? style['ab-test'] : ''} `}>
              {item.origin}
            </div>
          )
        },
      },
      {
        title: t('page.adminApi.table.server'),
        dataIndex: 'server',
        width: '20%',
      },
      {
        title: t('page.adminApi.table.dest'),
        width: 250,
        dataIndex: 'dest',
      },

      {
        title: t('page.adminApi.table.allowGroup'),
        render(col: number, item: any, index: number) {
          return (
            <>
              {item.allowGroup.map((id: number) => {
                return (
                  <Tag
                    checkable
                    color="arcoblue"
                    defaultChecked
                    checked={true}
                    style={{ margin: '1px', borderRadius: '1em' }}
                  >
                    {group.find((g: IGroup) => g.id === id)?.name}
                  </Tag>
                )
              })}
            </>
          )
        },
      },
      {
        title: t('page.adminApi.table.switch'),
        width: '100px',
        render: (col: number, item: any, index: number) => {
          return <div>{item.switch ? t('common.on') : t('common.off')}</div>
        },
      },
      {
        title: t('page.adminApi.table.isPublic'),
        width: '100px',
        render: (col: number, item: any, index: number) => {
          return <div>{item.isPublic ? t('common.yes') : t('common.no')}</div>
        },
      },
      {
        title: t('page.adminApi.table.createdAt'),
        width: 200,
        dataIndex: 'createdAt',
        render: (col: number, item: any, index: number) => {
          moment.locale(i18n.language)
          return <div>{moment(item.createdAt).toDate().toLocaleString()}</div>
        },
      },
      {
        title: t('page.adminApi.table.updatedAt'),
        width: 200,
        dataIndex: 'updatedAt',
        render: (col: number, item: any, index: number) => {
          moment.locale(i18n.language)
          return <div>{moment(item.updatedAt).toDate().toLocaleString()}</div>
        },
      },
      {
        title: t('page.adminApi.table.method'),
        dataIndex: 'method',
        width: 80,
        fixed: 'right' as any,
      },
    ]
  }, [group, i18n.language, t])
  // pagination
  const onChange = useCallback(
    (pagination: PaginationProps) => {
      onPageChange(pagination)
    },
    [onPageChange]
  )
  // add button in pagination area
  const onAdd = useCallback(() => {
    setSelected(undefined)
    setDrawerUsage(EDrawerUseType.CREATE)
    setDrawerVisible(true)
  }, [])
  // open drawer
  const onRow = useCallback((record: IAdminApi, index: number) => {
    return {
      onClick: () => {
        setSelected(record)
        setDrawerUsage(EDrawerUseType.MODIFY)
        setDrawerVisible(true)
      },
    }
  }, [])
  // init
  useEffect(() => {
    fetchGroupInfo()
    fetchBizInfo()
  }, [fetchGroupInfo, fetchBizInfo])

  return (
    <div>
      <Table
        scroll={{ y: '50vh', x: 2000 }}
        data={data}
        columns={columns}
        loading={loading}
        onChange={onChange}
        onRow={onRow}
        pagination={{
          total: total,
          pageSize: paginate.current.ipp,
          current: paginate.current.page,
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          sizeOptions: [10, 20, 50, 100, 200, 500, 1000],
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
      <ApiDrawer
        group={group}
        biz={biz}
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
