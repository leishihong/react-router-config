// Any font you want to use has to be imported
export const fontsizeFormats = '12px 14px 16px 18px 24px 36px 48px 56px 72px'
export const fontFormats =
  '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif苹果苹方=PingFang SC,Microsoft YaHei,sans-serif宋体=simsun,serif仿宋体=FangSong,serif黑体=SimHei,sans-serifArial=arial,helvetica,sans-serifArial Black=arial black,avant gardeBook Antiqua=book antiqua,palatinoComic Sans MS=comic sans ms,sans-serifCourier New=courier new,courierGeorgia=georgia,palatinoHelvetica=helveticaImpact=impact,chicagoSymbol=symbolTahoma=tahoma,arial,helvetica,sans-serifTerminal=terminal,monacoTimes New Roman=times new roman,timesVerdana=verdana,genevaWebdings=webdingsWingdings=wingdings,zapf dingbats知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif'

export const styleFormats = [
  {
    title: '首行缩进',
    block: 'p',
    styles: { 'text-indent': '2em' }
  },
  {
    title: '行高',
    items: [
      { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
      { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
      { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
      { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
      { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
    ]
  }
]

export const contentStyle = `
            *                         { padding:0 margin:0 }
            html, body                { height:100% }
            img                       { max-width:100% display:block height:auto margin-bottom:30px}
            a                         { text-decoration: none }
            iframe                    { width: 100% }
            p                         { line-height:1.6 margin: 0px }
            table                     { word-wrap:break-word word-break:break-all max-width:100% border:none border-color:#999 }
            .mce-object-iframe        { width:100% box-sizing:border-box margin:0 padding:0 }
            ul,ol                     { list-style-position:inside }
          `
