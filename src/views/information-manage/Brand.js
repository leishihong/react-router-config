import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Button, Divider, Select } from 'antd'
import { BaseTable, BaseModal } from '@/components/common'
import { brandColumn } from './includes/TableColumn'
import BrandModal from './includes/BrandModal'
import { ValidSelect } from '@/utils/CommonSelect'
import { isEmpty } from '@/lib/utils'
import { fetchBrandAdd, fetchBrandList } from '@/api/info'

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
    textAlign: 'left',
    marginTop: 4
  },
  reset: {
    marginRight: 6
  }
}

class BrandSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    handleSearch: PropTypes.func,
    handelModal: PropTypes.func,
    brandModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      brandModal: false,
      searchInfo: {
        id: '',
        state: '',
        brand: ''
      },
      brandTitle: ''
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.brandModal) prevProps.form.resetFields()
  }
  handelSearch = () => {
    const { getFieldsValue } = this.props.form
    this.props.handleSearch(isEmpty(getFieldsValue()))
  };
  handelResets = () => {
    this.props.handleSearch()
    setTimeout(() => {
      this.props.form.resetFields()
    }, 0)
  };
  handelBrand = () => {
    this.setState({
      brandModal: true,
      brandTitle: '添加品牌'
    })
  };
  hideCancelModal = () => {
    this.setState({
      brandModal: false
    })
  };
  handelModal = e => {
    this.setState(
      {
        brandModal: false
      },
      () => {
        this.props.handleSearch()
      }
    )
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { brandModal, brandTitle } = this.state
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 20 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="关键字">
                {getFieldDecorator('bBrandKeyword', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(ValidSelect).map(item => {
                      return <Option { ...item }>{item.label}</Option>
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 } style={ style.align }>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelSearch }
              >
                搜索
              </Button>
              <Button style={ style.reset } onClick={ this.handelResets }>
                重置
              </Button>
              <Button type="primary" onClick={ this.handelBrand }>
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {brandModal && (
          <BrandModal
            { ...{ brandModal, brandTitle } }
            handelModal={ this.handelModal }
            hideCancelModal={ this.hideCancelModal }
          />
        )}
      </Fragment>
    )
  }
}
const BrandSearchInfo = Form.create()(BrandSearch)

class Brand extends Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      imgShow: false,
      brandModal: false,
      editInfo: {},
      brandTitle: '',
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = [
      {
        title: '图片',
        width: 40,
        dataIndex: 'bImage',
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
        align: 'center',
        width: 80,
        render: row => (
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
    this.initBrandList()
  }
  initBrandList = async (info = {}) => {
    const params = Object.assign(info, this.state.searchInfo)
    const { code, results } = await fetchBrandList(params)
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
  hendelEdit = row => {
    this.setState({
      editInfo: Object.assign({}, row),
      brandModal: true,
      brandTitle: '编辑品牌'
    })
  };
  handelImgShow = img => {
    this.setState({
      imgShow: true,
      ImgIcon: img
    })
  };
  handleOk = () => {
    this.setState({
      imgShow: false
    })
  };
  hideCancelModal = () => {
    this.setState({
      brandModal: false
    })
  };
  handelModal = () => {
    this.setState(
      {
        brandModal: false
      },
      () => {
        this.initBrandList()
      }
    )
  };

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initBrandList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initBrandList()
      }
    )
  };
  render () {
    const {
      tableList,
      brandModal,
      brandTitle,
      pageInfo,
      imgShow,
      ImgIcon,
      editInfo
    } = this.state
    const columnList = [ ...brandColumn, ...this.actionColumn ]
    return (
      <Fragment>
        <BrandSearchInfo handleSearch={ this.initBrandList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {imgShow && (
          <BaseModal
            ModalTitle="图片查看"
            ModalWidth={ 900 }
            ModalVisible={ imgShow }
            hideModal={ this.handleOk }
            hideSuccessModal={ this.handleOk }
          >
            <img src={ ImgIcon } style={ { width: '100%', height: 600 } } />
          </BaseModal>
        )}
        {brandModal && (
          <BrandModal
            { ...{ brandModal, brandTitle, editInfo } }
            handelModal={ this.handelModal }
            hideCancelModal={ this.hideCancelModal }
          />
        )}
      </Fragment>
    )
  }
}
export default Brand
