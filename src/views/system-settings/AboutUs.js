import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { BaseEditor } from '@/components/common'
import { fetchLogAbout, fetchLogAboutInfo } from '@/api/about'

export class AboutUs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: '',
      haveData: false
    }
  }
  componentWillMount () {
    this.initAboutInfo()
  }

  initAboutInfo = async () => {
    const { code, results } = await fetchLogAboutInfo()
    if (code) {
      setTimeout(() => {
        this.setState({
          content: results && results.length > 0 ? results[ 0 ].common : '',
          haveData: true
        })
      }, 300)
    }
  };
  handelSuccess = async () => {
    const params = {
      common: this.state.content
    }
    const { code } = await fetchLogAbout(params)
    if (code) {
      this.initAboutInfo()
    }
  };

  onEditorChange = content => {
    this.setState({ content })
  };

  render () {
    const { haveData } = this.state
    return (
      <Card
        title="富文本"
        extra={
          <Button
            type="primary"
            style={ {
              marginTop: 20
            } }
            onClick={ this.handelSuccess }
          >
            修改
          </Button>
        }
      >
        <BaseEditor
          key={ haveData }
          ref="editor"
          tinymceId={ new Date().getTime() }
          content={ this.state.content }
          onEditorChange={ this.onEditorChange }
        />
      </Card>
    )
  }
}

export default AboutUs
