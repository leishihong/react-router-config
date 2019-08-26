const files = require.context('.', true, /\.js$/)

let configRouters = []

/**
 * inject routers
 */

files.keys().forEach(key => {
    if (key !== './index.js') {
        // 读取出文件中的default模块})
        return (configRouters = configRouters.concat(files(key).default))
    }
})

export default configRouters // 抛出一个Vue-router期待的结构的数组
