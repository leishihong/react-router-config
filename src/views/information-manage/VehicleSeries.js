import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Button, Divider, Select } from 'antd'
import { BaseTable, BaseModal } from '@/components/common'
import { seriesColumn } from './includes/TableColumn'
import SeriesModal from './includes/SeriesModal'
import SeriesSearch from './includes/SeriesSearch'
import { fetchAuditList } from '@/api/info'
const { Option } = Select
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
    textAlign: 'right'
  },
  reset: {
    marginRight: 6
  }
}
class VehicleSeries extends Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      editInfo: {},
      seriesTitle: '',
      seriesModal: false,
      imgShow: false,
      imgInfo: '',
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = [
      {
        title: 'APP图片',
        width: 40,
        dataIndex: 'aAppImage',
        render: (row, data) => (
          <Button
            size="small"
            type="link"
            onClick={ () => this.handelImgShow(row) }
          >
            查看
          </Button>
        )
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: (row, data) => (
          <Fragment>
            <Button
              size="small"
              type="primary"
              onClick={ () => this.hendelEdit(row) }
            >
              编辑
            </Button>
          </Fragment>
        )
      }
    ]
  }
  componentDidMount () {
    this.initSeriesList()
  }
  initSeriesList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchAuditList(params)
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
  handelImgShow = rows => {
    this.setState({
      imgShow: true,
      imgInfo: rows
    })
  };
  handelImgHide = () => {
    this.setState({
      imgShow: false
    })
  };
  hendelEdit = rows => {
    this.setState({
      editInfo: Object.assign({}, rows),
      seriesModal: true,
      seriesTitle: '编辑车系'
    })
  };
  handelSeries = () => {
    this.setState({
      seriesModal: true,
      seriesTitle: '添加车系'
    })
  };
  hideCancelModal = () => {
    this.setState({
      seriesModal: false
    })
  };
  handelModal = () => {
    this.setState(
      {
        seriesModal: false
      },
      () => {
        this.initSeriesList()
      }
    )
  };

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initSeriesList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initSeriesList()
      }
    )
  };
  render () {
    const {
      tableList,
      seriesModal,
      seriesTitle,
      pageInfo,
      imgShow,
      imgInfo,
      editInfo
    } = this.state
    const columnList = [ ...seriesColumn, ...this.actionColumn ]
    return (
      <Fragment>
        <SeriesSearch handelSearch={ this.initSeriesList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {imgShow && (
          <BaseModal
            ModalTitle="查看图片"
            ModalWidth={ 900 }
            ModalVisible={ imgShow }
            hideSuccessModal={ this.handelImgHide }
            hideModal={ this.handelImgHide }
          >
            <img style={ { width: '100%', height: 600 } } src={ imgInfo } />
          </BaseModal>
        )}
        {seriesModal && (
          <SeriesModal
            { ...{ seriesModal, seriesTitle, editInfo } }
            handelModal={ this.handelModal }
            hideCancelModal={ this.hideCancelModal }
          />
        )}
      </Fragment>
    )
  }
}
export default VehicleSeries
