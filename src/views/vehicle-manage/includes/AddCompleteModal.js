import React, { PureComponent, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { Row, Col, Form, Input, InputNumber, Select, DatePicker } from 'antd'
import { BaseModal } from '@/components/common'
import { completeRule } from './FormRule'
import { fetchCarEdit, fetchCarAdd } from '@/api/vehicle'
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
  getCarBidAid,
  getGuageAll,
  getSelectAidVid,
  getDistSelectAll,
  getCarTidDid,
  getDidSid,
  getYeWuSelect
} from '@/utils/config'

const { Option } = Select

class AddCompleteModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    completeModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    editInfo: PropTypes.array,
    completeTitle: PropTypes.string
  };
  constructor (props) {
    super(props)
    this.state = {
      completeModal: this.props.completeModal,
      brandList: [],
      gaugeList: [],
      auditList: [],
      guageAllList: [],
      disList: [],
      yeWuList: [],
      tradeSelectAll: [],
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
        manufactureDate: '',
        stock: '',
        configure: '',
        isTrade: 2,
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
    // 车城
    getAllTrade().then(res => {
      this.setState({
        tradeSelectAll: res
      })
    })
    // 经销商
    // getDistSelectAll().then(res => {
    //   this.setState({
    //     disList: res
    //   })
    // })
    // 业务员
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
          if (
            this.state.completeInfo.isTrade &&
            this.state.completeInfo.isTrade === 2
          ) {
            await this.handelTradeSelectAll(this.props.editInfo.tid)
            await this.handelDist(this.props.editInfo.did)
          }
        }
      )
    }
  }

  handelBrand = async val => {
    const res = await getCarBidAid({ id: val })
    this.setState({
      auditList: res,
      completeInfo: {
        aid: null,
        vid: null
      }
    })
  };
  handelAudit = async val => {
    const res = await getSelectAidVid({ aid: val })
    this.setState({
      gaugeList: res,
      completeInfo: {
        vid: null
      }
    })
  };
  // handelGauge = async val => {
  //   const res = await getGuageAll({ id: val })
  //   this.setState({
  //     guageAllList: res.data
  //   })
  // };
  handelTradeSelectAll = async val => {
    const res = await getCarTidDid({ id: val })
    this.setState({
      disList: res
    })
  };
  handelDist = async val => {
    const res = await getDidSid({ id: val })
    this.setState({
      yeWuList: res
    })
  };

  handelTrade = val => {
    this.setState({
      completeInfo: {
        isTrade: val
      }
    })
  };
  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        let params = fieldsValue
        if (this.props.editInfo) {
          params = Object.assign(fieldsValue, {
            id: this.props.editInfo.id
          })
        }
        params.manufactureDate = moment(params.manufactureDate).format(
          'YYYY-MM-DD'
        )
        if (this.props.editInfo) {
          const { code } = await fetchCarEdit(params)
          if (code) {
            this.props.handelModal(e)
          }
        } else {
          const { code } = await fetchCarAdd(params)
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
      yeWuList,
      tradeSelectAll
    } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.completeTitle }
        ModalVisible={ this.state.completeModal }
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
                    {Object.values(this.state.auditList).map(item => (
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
              <Form.Item label="平台/车城">
                {getFieldDecorator('isTrade', {
                  initialValue: completeInfo.isTrade,
                  ...completeRule.isTrade
                })(
                  <Select onChange={ val => this.handelTrade(val) }>
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
              <Form.Item label="车城名称">
                {getFieldDecorator('tid', {
                  initialValue: completeInfo.tid,
                  rules: [
                    completeInfo.isTrade && completeInfo.isTrade === 1 ?
                      {
                          required: false,
                          message: '车城名称不能为空'
                        } :
                      {
                          required: true,
                          message: '车城名称不能为空'
                        }
                  ]
                })(
                  <Select
                    onChange={ val => this.handelTradeSelectAll(val) }
                    disabled={
                      completeInfo.isTrade && completeInfo.isTrade === 1
                    }
                  >
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
              <Form.Item label="经销商">
                {getFieldDecorator('did', {
                  initialValue: completeInfo.did,
                  rules: [
                    completeInfo.isTrade && completeInfo.isTrade === 1 ?
                      {
                          required: false,
                          message: '经销商不能为空'
                        } :
                      {
                          required: true,
                          message: '经销商不能为空'
                        }
                  ]
                })(
                  <Select
                    disabled={
                      completeInfo.isTrade && completeInfo.isTrade === 1
                    }
                    onChange={ val => this.handelDist(val) }
                  >
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
                  initialValue: completeInfo.sid
                  // rules: [
                  //   completeInfo.isTrade && completeInfo.isTrade === 1 ?
                  //     {
                  //         required: false,
                  //         message: '业务员不能为空'
                  //       } :
                  //     {
                  //         required: true,
                  //         message: '业务员不能为空'
                  //       }
                  // ]
                })(
                  <Select
                    disabled={
                      completeInfo.isTrade && completeInfo.isTrade === 1
                    }
                  >
                    {Object.values(yeWuList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            {/* tradeSelectAll */}
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
                })(<InputNumber style={ { width: '100%' } } />)}
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
                })(
                  <DatePicker format={ 'YYYY-MM-DD' } style={ { width: '100%' } } />
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="车辆库存">
                {getFieldDecorator('count', {
                  initialValue: completeInfo.count,
                  ...completeRule.count
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

export default Form.create({})(AddCompleteModal)
