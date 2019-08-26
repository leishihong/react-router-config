import React, { Component, Fragment } from 'react'
import { Button, Divider } from 'antd'
import RuleSearch from './includes/RuleSearch'
import AddRuleModal from './includes/AddRuleModal'
import { BaseTable } from '@/components/common'
import { ruleColumn } from './includes/TableColumn.js'
import { fetchGaugeList, fetchGaugeDel } from '@/api/info'

class VehicleRule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      editInfo: {},
      ruleModal: false,
      ruleTitle: '',
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = {
      title: '操作',
      width: 140,
      align: 'center',
      render: (row, data) => (
        <Fragment>
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelEdit(row) }
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelDel(row) }
          >
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initRuleList()
  }

  initRuleList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchGaugeList(params)
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
  handelEdit = row => {
    this.setState({
      editInfo: row,
      ruleModal: true,
      ruleTitle: '编辑车规'
    })
  };
  handelDel = async row => {
    const { code } = await fetchGaugeDel({ id: row.id })
    if (code) {
      this.initRuleList()
    }
  };
  handelModal = () => {
    this.setState(
      {
        ruleModal: false
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
    const { tableList, pageInfo, ruleModal, ruleTitle, editInfo } = this.state
    const columnList = [ ...ruleColumn, this.actionColumn ]
    return (
      <Fragment>
        <RuleSearch handleSearch={ this.initRuleList }></RuleSearch>
        <BaseTable
          { ...{ pageInfo, columnList, tableList } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {ruleModal && (
          <AddRuleModal
            { ...{ ruleModal, ruleTitle, editInfo } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                ruleModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default VehicleRule
