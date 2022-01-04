import { List, Avatar, Button, Skeleton, Card } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const ListDemo = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [finish, setFinish] = useState(false) // 是否全部加载完
  const list = useSelector((state) => state.demoOne.list)

  const onLoadMore = async () => {
    setLoading(true)
    await ListDemo.appSyncRequestFetching({ dispatch })
    setLoading(false)
  }

  useEffect(() => {
    onLoadMore()
  }, [])

  const loadMore = finish ? null : (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  )

  return (
    <Card>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loadMore={loadMore}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a>{item.name}</a>}
                description={item.email}
              />
              <div>{item.content}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  )
}

const actionCreatator = () => {
  return async (dispatch) => {
    const { data } = await axios.get('http://localhost:4000/getDemoOne')
    dispatch({
      type: 'RECEIVE_DEMO_ONE_LIST',
      payload: data.data.list,
    })
  }
}

ListDemo.appSyncRequestFetching = ({ dispatch }) => {
  return dispatch(actionCreatator())
}

export default ListDemo
