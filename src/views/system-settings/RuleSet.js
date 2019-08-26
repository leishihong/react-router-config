import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import { Divider, Button } from 'antd'
import { BaseTable } from '@/components/common'
import AddRuleSetModal from './includes/AddRuleSetModal'
import { ruleSetColumn } from './includes/TableColumn'
import RuleSetSearch from './includes/RuleSetSearch'
import { fetchRuleList, fetchRuleDel, fetchRuleState } from '@/api/system'

export class RuleSet extends Component {
  static propTypes = {
    form: PropTypes.object,
    ruleSetModal: PropTypes.bool
  };
  constructor (props) {
    super(props)
    this.state = {
      ruleSetModal: false,
      adminTitle: '',
      tableList: [ { name: '11' } ],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionList = [
      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 220,
        render: (row, record) => (
          <span>
            <Button type="primary" size="small" onClick={ this.handelEdit }>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              size="small"
              onClick={ () => this.handelState(row) }
            >
              {row.status === 1 ? '启用' : '禁用'}
            </Button>
            <Divider type="vertical" />
            <Button
              type="danger"
              size="small"
              onClick={ () => this.handelDel(row) }
            >
              删除
            </Button>
          </span>
        )
      }
    ]
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.ruleSetModal) prevProps.form.resetFields()
  }
  componentDidMount () {
    this.initRuleList()
  }
  initRuleList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchRuleList(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      setTimeout(() => {
        this.setState({
          tableList: results.data,
          pageInfo: pageInfo
        })
      }, 300)
    }
  };
  handelState = async row => {
    const params = {
      id: row.id,
      state: row.status === 1 ? 0 : 1
    }
    const { code } = await fetchRuleState(params)
    if (code) {
      this.initRuleList()
    }
  };
  handelDel = async row => {
    const { code } = await fetchRuleDel({ id: row.id })
    if (code) {
      this.initRuleList()
    }
  };
  handelSuccessModal = () => {
    this.setState(
      {
        ruleSetModal: false
      },
      () => {
        this.initRuleList()
      }
    )
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initRuleList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initRuleList()
      }
    )
  };
  render () {
    const { tableList, ruleSetModal, adminTitle, pageInfo } = this.state
    const columnList = [ ...ruleSetColumn, ...this.actionList ]
    return (
      <Fragment>
        <RuleSetSearch handleSearch={ this.initRuleList }></RuleSetSearch>
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        ></BaseTable>
        {ruleSetModal && (
          <AddRuleSetModal
            { ...{ ruleSetModal } }
            handelSuccessModal={ this.handelSuccessModal }
          />
        )}
      </Fragment>
    )
  }
}

export default RuleSet
