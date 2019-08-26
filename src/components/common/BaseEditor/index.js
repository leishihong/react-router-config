/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultPlugins from './plugins';
import defaultToolbar from './toolbar';
import './index.less';
import {
  fontsizeFormats,
  fontFormats,
  styleFormats,
  contentStyle,
} from './fonts';
import { fetchFileUpload } from '@/api/common';

const tinymceId = Date.now();

class Tinymce extends Component {
  static propTypes = {
    content: PropTypes.string,
    toolbar: PropTypes.array,
    menubar: PropTypes.string,
    height: PropTypes.number,
    getContent: PropTypes.func,
  };
  static defaultProps = {
    tinymceId,
    menubar: 'file edit insert view format table',
    height: 520,
    toolbar: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      hasChange: false,
      hasInit: false,
      fullscreen: false,
      editor: null,
      tinymceId,
    };
  }

  componentDidMount() {
    this.initTinymce();
  }
  componentWillUnmount() {
    this.destroyTinymce();
  }
  initTinymce() {
    const {
      tinymceId,
      menubar,
      height,
      toolbar,
      content,
      getContent,
    } = this.props;
    const _this = this;
    window.tinymce.init({
      language: 'zh_CN',
      selector: `#${tinymceId}`,
      height: height,
      // 新增配置 ---
      theme: 'modern', //默认主题
      menubar: false, //去除文件栏
      element_format: 'html',
      schema: 'html5',
      valid_elements: '*[*]',
      mode: 'textareas',
      entity_encoding: 'raw',
      content_css: [
        'http://fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        'http://www.tiny.cloud/css/codepen.min.css',
      ], //引用的外部CSS样式，可删除
      branding: false, //去除右下角的'由tinymce驱动'
      elementpath: false, //左下角的当前标签路径
      paste_webkit_styles: true, // 设置样式不被剔除
      // CONFIG
      forced_root_block: 'p',
      force_p_newlines: true,
      importcss_append: true,
      // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
      content_style: contentStyle,
      insert_button_items: 'image link | inserttable',
      // CONFIG: Paste
      paste_retain_style_properties: 'all',
      paste_word_valid_elements: '*[*]', // word需要它
      paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false, // 插入word文档需要该属性
      paste_webkit_styles: 'all',
      paste_merge_formats: true,
      nonbreaking_force_tab: false,
      paste_auto_cleanup_on_paste: false,
      // CONFIG: StyleSelect
      style_formats: styleFormats,
      // Tab
      tabfocus_elements: ':prev,:next',
      object_resizing: true,
      // Image
      imagetools_toolbar:
        'rotateleft rotateright | flipv fliph | editimage imageoptions',
      //结束 ----
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar: toolbar.length > 0 ? toolbar : defaultToolbar,
      menubar: menubar,
      plugins: defaultPlugins,
      end_container_on_empty_block: true,
      fontsize_formats: fontsizeFormats,
      font_formats: fontFormats,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      images_upload_url: '/tinymce', // 上传图片地址 tab
      link_title: false,
      nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp need Nonbreaking Space Plugin
      // 图片上传
      images_upload_handler: function(blobInfo, success, failure) {
        console.log('blobInfo我被调用了');
        if (blobInfo.blob().size > self.maxSize) {
          failure('文件体积过大');
        }
        // if (self.accept.indexOf(blobInfo.blob().type) > 0) {
        uploadPic();
        // } else {
        //   failure('图片格式错误')
        // }
        function uploadPic() {
          // const xhr = new XMLHttpRequest()
          const formData = new FormData();
          // xhr.withCredentials = false
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          fetchFileUpload(formData).then(res => {
            if (res.status === 200) {
              success(res.data.data.host_path);
              self.props.uploadComplete(res);
            } else {
              failure('上传失败: ');
              self.props.uploadComplete(res);
              // self.props('on-upload-complete', res); // 抛出 'on-upload-complete' 钩子
            }
          });
          // xhr.open('POST', globals.host + '/common/image')
          // xhr.onload = function () {
          //   if (xhr.status !== 200) {
          //     // 抛出 'on-upload-fail' 钩子
          //     self.$emit('on-upload-fail')
          //     failure('上传失败: ' + xhr.status)
          //     return
          //   }
          //   const json = JSON.parse(xhr.responseText)
          //   // 抛出 'on-upload-complete' 钩子
          //   self.$emit('on-upload-complete', [
          //     json, success, failure
          //   ])
          // }
          // xhr.send(formData)
        }
      },
      init_instance_callback: editor => {
        if (content) {
          setTimeout(() => {
            editor.setContent(content);
          }, 300);
        }
        _this.setState({
          hasInit: true,
        });
        editor.on('NodeChange Change KeyUp SetContent', () => {
          _this.setState({
            hasChange: true,
          });
          editor.getContent({ format: 'raw' });
        });
      },
      setup(editor) {
        _this.setState({ editor });
        editor.on('change', e => {
          // _this.props.getContent(editor.getContent());
        });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          _this.props.onEditorChange(content);
        });
        editor.on('FullscreenStateChanged', e => {
          _this.setState({
            fullscreen: e.state,
          });
        });
      },
    });
  }
  destroyTinymce() {
    const { tinymceId } = this.props;
    const { fullscreen } = this.state;
    const tinymce = window.tinymce.get(tinymceId);
    if (fullscreen) {
      tinymce.execCommand('mceFullScreen');
    }

    if (tinymce) {
      tinymce.destroy();
    }
  }
  setContent(value) {
    const { tinymceId } = this.props;
    window.tinymce.get(tinymceId).setContent(value);
  }
  getContent() {
    console.log(window.tinymce.get(`#${this.props.tinymceId}`));
    const { tinymceId } = this.props;
    const content = window.tinymce
      .get(`#${tinymceId}`)
      .getContent({ format: 'html' });
    this.props.getContent(content);
  }
  saveToGetContent() {
    const { tinymceId, getContent } = this.props;
    if (getContent && typeof getContent === 'function') {
      getContent(
        window.tinymce.get(`#${tinymceId}`).getContent({ format: 'raw' })
      );
    }
  }

  /**
   * 上传图片成功回调
   *  */
  imageSuccessCBK(arr) {
    const { tinymceId } = this.props;
    arr.forEach(v => {
      window.tinymce
        .get(tinymceId)
        .insertContent(`<img class="wscnph" src="${v.url}" >`);
    });
  }
  render() {
    const { tinymceId } = this.props;
    const { fullscreen } = this.state;
    return (
      <div>
        <div
          className={
            fullscreen
              ? 'tinymce-container mce-fullscreen'
              : 'tinymce-container'
          }
        >
          <textarea id={tinymceId} />
          {/* <div className="editor-custom-btn-container">
            <UploadImage
              className="editor-upload-btn"
              imageSuccessCBK={arr => {
                this.imageSuccessCBK(arr)
              }}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Tinymce;
