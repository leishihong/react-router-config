import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Button, DatePicker } from 'antd'
import moment from 'moment'
import { BaseTable } from '@/components/common'
import { fetchLogList } from '@/api/system'

const { RangePicker } = DatePicker
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}
const style = {
  align: {
    textAlign: 'left'
  },
  reset: {
    marginRight: 6,
    marginTop: 4
  }
}

class ActionLog extends Component {
  static propTypes = {
    prop: PropTypes
  };
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      columnList: [
        {
          title: '操作时间',
          dataIndex: 'makeDate'
        },
        {
          title: '操作人',
          dataIndex: 'operator'
        },
        {
          title: '操作内容',
          dataIndex: 'operatingContent'
        }
      ],
      dateRecord: [],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
  }
  componentDidMount () {
    this.initLogList()
  }
  initLogList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchLogList(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      this.setState({
        tableList: results.data,
        pageInfo: pageInfo
      })
    }
  };
  handelChangeDate = date => {
    this.setState({
      dateRecord: [
        date && date.length > 0 ? moment(date[ 0 ]).format('YYYY-MM-DD') : '',
        date && date.length > 0 ? moment(date[ 1 ]).format('YYYY-MM-DD') : ''
      ]
    })
  };
  handelSearch = () => {
    const { dateRecord } = this.state
    const params = {
      createDateLeft: Array.isArray(dateRecord) ? dateRecord[ 0 ] : '',
      createDateRight: Array.isArray(dateRecord) ? dateRecord[ 1 ] : ''
    }
    this.initLogList(params)
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initLogList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initLogList()
      }
    )
  };
  render () {
    const { tableList, columnList, pageInfo, dateRecord } = this.state
    return (
      <div>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="操作时间">
                <RangePicker
                  defaultValue={ dateRecord }
                  onChange={ this.handelChangeDate }
                />
              </Form.Item>
            </Col>
            <Col span={ 16 } style={ style.align }>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelSearch }
              >
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
      </div>
    )
  }
}
export default ActionLog
