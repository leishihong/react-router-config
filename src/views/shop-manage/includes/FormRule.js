/**
 * @type{rules} 校验规则
 * @type{validateTrigger} 触发事件类型  分别为['onChange','onBlur']
 * @type{validator} 自定义验证规则
 */

const validatePhone = (rule, value, callback) => {
  console.log(value)
  if (value === '' || value === null || value === undefined) {
    callback(new Error('手机号码不能为空'))
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    callback('手机号码格式错误')
  } else {
    callback()
  }
}
// 新增车城表单校验
export const carRule = {
  shopName: {
    rules: [
      {
        required: true,
        message: '商城名称不能为空'
      }
    ]
  },
  shopAddress: {
    rules: [
      {
        required: true,
        message: '商城地址不能为空'
      }
    ]
  },
  state: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  },
  telephone: {
    rules: [ { required: true, validator: validatePhone } ]
  },
  shopCharge: {
    rules: [
      {
        required: true,
        message: '商城负责人姓名不能为空'
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        message: '密码不能为空'
      }
    ]
  }
}
// 新增经销商表单检验
export const dealerRule = {
  distributor: {
    rules: [
      {
        required: true,
        message: '经销商名称不能为空'
      }
    ]
  },
  carType: {
    rules: [
      {
        required: true,
        message: '所属车城不能为空'
      }
    ]
  },
  status: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  },
  address: {
    rules: [
      {
        required: true,
        message: '地址不能为空'
      }
    ]
  },
  distributorName: {
    rules: [
      {
        required: true,
        message: '经销商负责人姓名不能为空'
      }
    ]
  },
  phone: {
    rules: [ { required: true, validator: validatePhone } ]
  }
}
// 新增销售 业务员校验
export const marketRule = {
  tid: {
    rules: [
      {
        required: true,
        message: '所属车城不能为空'
      }
    ]
  },
  did: {
    rules: [
      {
        required: true,
        message: '所属经销商不能为空'
      }
    ]
  },
  state: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  },
  name: {
    rules: [
      {
        required: true,
        message: '业务员姓名不能为空'
      }
    ]
  },
  telephone: {
    rules: [ { required: true, validator: validatePhone } ]
  }
}
// 新增摄像头表单校验
export const cameraRule = {
  name: {
    validateTrigger: [ 'onBlur' ],
    rules: [
      {
        required: true,
        message: '摄像头名称不能为空'
      }
    ]
  },
  url: {
    validateTrigger: [ 'onBlur' ],
    rules: [
      {
        required: true,
        message: '地址不能为空'
      }
    ]
  }
}
