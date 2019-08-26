import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { Row, Col, Form, Input, Select, DatePicker } from 'antd'
import { BaseModal } from '@/components/common'
import { completeRule } from './FormRule'
import { fetchTradeAdd } from '@/api/vehicle'
import {
  ToggleSelect,
  statusSelect,
  salesStates,
  ValidSelect,
  stradeSelect
} from '@/utils/CommonSelect'
import {
  getAllTrade,
  getBrandSelectAll,
  getAuditSelectAll,
  getGaugeSelectAll,
  getGuageAll,
  getDistSelectAll,
  getYeWuSelect
} from '@/utils/config'

const { Option } = Select

export class AddOptimizationModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    platformModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    editInfo: PropTypes.array,
    platformTitle: PropTypes.string
  };
  constructor (props) {
    super(props)
    this.state = {
      platformModal: this.props.platformModal,
      brandList: [],
      gaugeList: [],
      auditList: [],
      tradeSelectAll: [],
      guageAllList: [],
      disList: [],
      yeWuList: [],
      completeInfo: {
        id: '',
        bid: '',
        aid: '',
        vid: '',
        gid: '',
        state: '',
        color: '',
        tid: '',
        did: '',
        sid: '',
        price: '',
        salesState: '',
        manufactureDate: '',
        stock: '',
        configure: '',
        isOpen: '',
        address: '',
        standard: '',
        isGreat: '',
        image: '',
        count: '',
        trade: ''
      }
    }
  }
  componentDidMount () {
    getAllTrade().then(res => {
      this.setState({
        tradeSelectAll: res
      })
    })
    getBrandSelectAll().then(res => {
      this.setState({
        brandList: res
      })
    })
    getAuditSelectAll().then(res => {
      this.setState({
        auditList: res
      })
    })
    getGaugeSelectAll().then(res => {
      this.setState({
        gaugeList: res
      })
    })
    getGuageAll().then(res => {
      this.setState({
        guageAllList: res.data
      })
    })
    getDistSelectAll().then(res => {
      this.setState({
        disList: res
      })
    })
    getYeWuSelect().then(res => {
      this.setState({
        yeWuList: res
      })
    })
    if (this.props.editInfo) {
      this.setState({
        completeInfo: this.props.editInfo
      })
    }
  }

  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchTradeAdd(fieldsValue)
        if (code) {
          this.props.handelModal(e)
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
      yeWuList,
      tradeSelectAll
    } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.platformTitle }
        ModalVisible={ this.state.platformModal }
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
                  <Select>
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
                  <Select>
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
              <Form.Item label="车城名称">
                {getFieldDecorator('trade', {
                  initialValue: completeInfo.trade,
                  ...completeRule.trade
                })(
                  <Select>
                    {Object.values(tradeSelectAll).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
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
              <Form.Item label="平台/车城">
                {getFieldDecorator('isTrade', {
                  initialValue: completeInfo.isTrade,
                  ...completeRule.isTrade
                })(
                  <Select>
                    {Object.values(stradeSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="经销商">
                {getFieldDecorator('did', {
                  initialValue: completeInfo.did,
                  ...completeRule.did
                })(
                  <Select>
                    {Object.values(disList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="业务员">
                {getFieldDecorator('sid', {
                  initialValue: completeInfo.sid,
                  ...completeRule.sid
                })(
                  <Select>
                    {Object.values(yeWuList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="价格">
                {getFieldDecorator('price', {
                  initialValue: completeInfo.price,
                  ...completeRule.price
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="售卖状态">
                {getFieldDecorator('salesState', {
                  initialValue: completeInfo.salesState,
                  ...completeRule.salesState
                })(
                  <Select>
                    {Object.values(salesStates).map(item => (
                      <Option { ...item }>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="车辆生产日期">
                {getFieldDecorator('manufactureDate', {
                  initialValue: moment(
                    completeInfo.manufactureDate || new Date(),
                    'YYYY-MM-DD'
                  ),
                  ...completeRule.manufactureDate
                })(<DatePicker style={ { width: '100%' } } />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="车辆库存">
                {getFieldDecorator('count', {
                  initialValue: completeInfo.count,
                  ...completeRule.count
                })(<Input />)}
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
              <Form.Item label="车辆所在地">
                {getFieldDecorator('address', {
                  initialValue: completeInfo.address,
                  ...completeRule.address
                })(<Input />)}
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
            <Col span={ 8 }>
              <Form.Item label="优选车源">
                {getFieldDecorator('isGreat', {
                  initialValue: completeInfo.isGreat,
                  ...completeRule.isGreat
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

export default Form.create({})(AddOptimizationModal)
