import React, { PureComponent, Fragment } from 'react'
import { Table, Pagination } from 'antd'
import PropTypes from 'prop-types'

export class BaseTable extends PureComponent {
  static propTypes = {
    columnList: PropTypes.array,
    tableList: PropTypes.array,
    pageInfo: PropTypes.object,
    changePage: PropTypes.func,
    changePageSize: PropTypes.func
  };
  /**
   *页码改变的回调，参数是改变后的页码及每页条数
   * @memberof BaseTable
   */
  changePage = (page, pageSize) => {
    this.props.changePage(page, pageSize)
  };
  /**
   * pageSize 变化的回调
   * @memberof BaseTable
   */
  changePageSize = (current, pageSize) => {
    this.props.changePageSize(current, pageSize)
  };
  // 设置斑马线
  // stripeTables () {
  //   if (!document.getElementsByTagName) return false
  //   var tables = document.getElementsByTagName('table')
  //   var odd, rows
  //   for (var i = 0; i < tables.length; i++) {
  //     odd = false
  //     rows = tables[ i ].getElementsByTagName('tr')
  //     for (var j = 0; j < rows.length; j++) {
  //       if (odd == true) {
  //         addClass(rows[ j ], 'odd')
  //         odd = false
  //       } else {
  //         odd = true
  //       }
  //     }
  //   }
  // }

  render () {
    const { columnList, tableList, pageInfo } = this.props
    return (
      <Fragment>
        <Table
          rowKey={ (record, index) => `complete${ record.id }${ index }` }
          style={ { marginTop: 20 } }
          columns={ columnList }
          dataSource={ tableList }
          size="middle"
          bordered
          scroll={ { x: 'max-content' } }
          pagination={ false }
        />
        <Pagination
          style={ {
            marginTop: '20px'
          } }
          total={ pageInfo.sizeCount }
          defaultCurrent={ pageInfo.page }
          defaultPageSize={ pageInfo.size }
          pageSizeOptions={ [ '20', '50', '80', '100', '200' ] }
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={ false }
          showTotal={ total => `共 ${ total } 条数据` }
          onChange={ this.changePage }
          onShowSizeChange={ this.changePageSize }
        />
      </Fragment>
    )
  }
}

export default BaseTable
