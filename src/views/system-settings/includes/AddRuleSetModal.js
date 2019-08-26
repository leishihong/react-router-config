import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Select, Tree } from 'antd'
import { BaseModal } from '@/components/common'
import { ruleSetRule } from './FromRule'
import { fetchUserAdd } from '@/api/system'
import MenuConfig from '@/utils/MenuConfig.js'
const { Option } = Select
const { TreeNode } = Tree

class AddRuleSetModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    ruleSetModal: PropTypes.bool,
    adminTitle: PropTypes.string,
    handelSuccessModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      expandedKeys: [ '1', '5' ],
      autoExpandParent: true,
      checkedKeys: [ '1', '6', '8' ],
      selectedKeys: [],
      ruleSetInfo: {
        name: '',
        state: '',
        rule: []
      }
    }
  }
  handelSuccess = e => {
    console.log(this.state.expandedKeys, this.state.checkedKeys)
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchUserAdd(fieldsValue)
        if (code) {
          this.props.handelSuccessModal(e)
        }
      }
    })
  };
  renderTree = jsonTree =>
    jsonTree.map(item => {
      //遍历树状数组，如果发现他有children则先套上<TreeNode>,再对他children中的元素做相同的操纵，直到children为空的元素停止，说明他们已经是最深的那一层了。
      if (item.children) {
        return (
          <TreeNode { ...item } key={ item.id } selectable={ true } title={ item.text }>
            {/* //对children中的每个元素进行递归 */}
            {this.renderTree(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          { ...item }
          key={ item.id }
          selectable={ true }
          title={ item.text }
        ></TreeNode>
      )
    });
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  };

  onCheck = (checkedKeys, info) => {
    const { checked, checkedNodes } = info
    checkedNodes.map(item => {
      const { props } = item
      console.log(props)
    })
    const checkedKeysResult = [ ...checkedKeys, ...info.halfCheckedKeys ]
    console.log('onCheck', checkedKeys, checkedKeysResult)
    this.setState({ checkedKeys })
  };

  onSelect = (selectedKeys, info) => {
    const { node } = info
    const { props } = node
    console.log('onSelect', props)
    this.setState({ selectedKeys })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { ruleSetInfo } = this.state

    return (
      <BaseModal
        ModalTitle="添加权限"
        ModalVisible={ this.props.ruleSetModal }
        hideSuccessModal={ () => this.handelSuccess(true) }
        hideModal={ () => this.props.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="权限名称">
                {getFieldDecorator('account', {
                  initialValue: ruleSetInfo.name,
                  ...ruleSetRule.name
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: ruleSetInfo.state,
                  ...ruleSetRule.state
                })(
                  <Select>
                    <Option value={ 0 }>开启</Option>
                    <Option value={ 1 }>禁用</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="权限树">
                {getFieldDecorator('treeId', { initialValue: '' })(
                  // defaultCheckedKeys 默认选中的id 可以是单独的id 也可以是父节点
                  // defaultExpandedKeys 默认展开的父节点id
                  // defaultSelectedKeys 默认选中的树节点 没生效暂时
                  <Tree
                    checkable
                    onExpand={ this.onExpand }
                    expandedKeys={ this.state.expandedKeys }
                    autoExpandParent={ this.state.autoExpandParent }
                    // onCheck={ this.onCheck }
                    checkedKeys={ this.state.checkedKeys }
                    onSelect={ this.onSelect }
                    selectedKeys={ this.state.selectedKeys }
                    // defaultSelectedKeys={ [ 1, 2, 5 ] }
                    // defaultExpandedKeys={ [ 1, 5 ] }
                    // defaultSelectedKeys={ [ 1, 6, 8 ] }
                    // defaultCheckedKeys={ [ 1, 6, 8 ] }
                    // onSelect={ this.onSelect }
                    onCheck={ this.onCheck }
                  >
                    {this.renderTree(MenuConfig)}
                  </Tree>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}
export default Form.create({})(AddRuleSetModal)
