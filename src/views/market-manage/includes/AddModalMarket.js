import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Form, Input, InputNumber, Select, DatePicker } from 'antd'
import { BaseModal } from '@/components/common'
import { completeRule } from './FormRule'
import { fetchMarketAdd, fetchMarketEdit } from '@/api/market'
import {
  ToggleSelect,
  statusSelect,
  salesStates,
  ValidSelect,
  stradeSelect
} from '@/utils/CommonSelect'
import {
  getBrandSelectAll,
  getAuditSelectAll,
  getGaugeSelectAll,
  getGuageAll,
  getSelectAidVid,
  getDistSelectAll,
  getYeWuSelect,
  getCarBidAid,
  getCarTidDid,
  getDidSid
} from '@/utils/config'

const { Option } = Select

class AddModalMarket extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    MarketModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    editInfo: PropTypes.array,
    MarketTitle: PropTypes.string
  };
  constructor (props) {
    super(props)
    this.state = {
      MarketModal: this.props.MarketModal,
      brandList: [],
      gaugeList: [],
      auditList: [],
      guageAllList: [],
      disList: [],
      yeWuList: [],
      completeInfo: {
        id: '',
        bid: '',
        aid: '',
        vid: '',
        gid: '',
        state: 0,
        color: '',
        tid: '',
        did: '',
        sid: '',
        price: '',
        salesState: '',
        // manufactureDate: '',
        stock: '',
        configure: '',
        isOpen: '',
        address: '',
        standard: '',
        isGreat: '',
        image: '',
        count: ''
      }
    }
  }
  componentDidMount () {
    getBrandSelectAll().then(res => {
      this.setState({
        brandList: res
      })
    })
    // getAuditSelectAll().then(res => {
    //   this.setState({
    //     auditList: res
    //   })
    // })
    // getGaugeSelectAll().then(res => {
    //   this.setState({
    //     gaugeList: res
    //   })
    // })
    getGuageAll().then(res => {
      this.setState({
        guageAllList: res.data
      })
    })
    // getDistSelectAll().then(res => {
    //   this.setState({
    //     disList: res
    //   })
    // })
    // getYeWuSelect().then(res => {
    //   this.setState({
    //     yeWuList: res
    //   })
    // })
    if (this.props.editInfo) {
      this.setState(
        {
          completeInfo: this.props.editInfo
        },
        async () => {
          await this.handelBrand(this.props.editInfo.bid)
          await this.handelAudit(this.props.editInfo.aid)
          // await this.handelGauge(this.props.editInfo.vid)
        }
      )
    }
  }
  handelBrand = async val => {
    const res = await getCarBidAid({ id: val })
    this.setState({
      auditList: res
    })
    // getAuditSelectAll().then(res => {
    // this.setState({
    //   auditList: res
    // })
    // })
  };
  handelAudit = async val => {
    const res = await getSelectAidVid({ aid: val })
    this.setState({
      gaugeList: res
    })
    // getGaugeSelectAll().then(res => {
    //   this.setState({
    //     gaugeList: res
    //   })
    // })
  };
  // handelGauge = async val => {
  //   const res = await getGuageAll({ id: val })
  //   this.setState({
  //     guageAllList: res.data
  //   })
  // };
  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        let params = fieldsValue
        if (this.props.editInfo) {
          params = Object.assign(fieldsValue, {
            id: this.props.editInfo.id
          })
        }
        // params.manufactureDate = moment(params.manufactureDate).format(
        //   'YYYY-MM-DD'
        // )
        if (this.props.editInfo) {
          const { code } = await fetchMarketEdit(params)
          if (code) {
            this.props.handelModal(e)
          }
        } else {
          const { code } = await fetchMarketAdd(params)
          if (code) {
            this.props.handelModal(e)
          }
        }
      }
    })
  };
  hideCancelModal = _ => {
    this.props.hideCancelModal()
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const {
      completeInfo,
      brandList,
      auditList,
      gaugeList,
      guageAllList,
      disList,
      yeWuList
    } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.MarketTitle }
        ModalVisible={ this.state.MarketModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="品牌">
                {getFieldDecorator('bid', {
                  initialValue: completeInfo.bid,
                  ...completeRule.bid
                })(
                  <Select onChange={ val => this.handelBrand(val) }>
                    {Object.values(brandList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="车系">
                {getFieldDecorator('aid', {
                  initialValue: completeInfo.aid,
                  ...completeRule.aid
                })(
                  <Select onChange={ val => this.handelAudit(val) }>
                    {Object.values(auditList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="车型">
                {getFieldDecorator('vid', {
                  initialValue: completeInfo.vid,
                  ...completeRule.vid
                })(
                  <Select>
                    {Object.values(gaugeList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="车规">
                {getFieldDecorator('gid', {
                  initialValue: completeInfo.gid,
                  ...completeRule.gid
                })(
                  <Select>
                    {Object.values(guageAllList).map(item => (
                      <Option label={ item.gaugeName } value={ item.id }>
                        {item.gaugeName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: completeInfo.state,
                  ...completeRule.state
                })(
                  <Select>
                    {Object.values(ToggleSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={ 8 }>
              <Form.Item label="颜色">
                {getFieldDecorator('color', {
                  initialValue: completeInfo.color,
                  ...completeRule.color
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="价格">
                {getFieldDecorator('price', {
                  initialValue: completeInfo.price,
                  ...completeRule.price
                })(<InputNumber style={ { width: '100%' } } min={ 0 } />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="配置">
                {getFieldDecorator('configure', {
                  initialValue: completeInfo.configure,
                  ...completeRule.configure
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="环保公开">
                {getFieldDecorator('isOpen', {
                  initialValue: completeInfo.isOpen,
                  ...completeRule.isOpen
                })(
                  <Select>
                    {Object.values(statusSelect).map(item => (
                      <Option { ...item }>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="手续">
                {getFieldDecorator('stock', {
                  initialValue: completeInfo.stock,
                  ...completeRule.stock
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="排放标准">
                {getFieldDecorator('standard', {
                  initialValue: completeInfo.standard,
                  ...completeRule.standard
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="图片">
                {getFieldDecorator('image', {
                  initialValue: completeInfo.image,
                  ...completeRule.image
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddModalMarket)
