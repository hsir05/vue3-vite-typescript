//validator.ts

export const loginRules = {
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
};

export const basicRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { message: '请输入正确格式的邮箱', pattern:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, trigger: 'blur' }
    ],
    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    phone: [
        { required: true, message: '请输入电话号码', trigger: 'blur' },
        {  }
    ],
    introduce: [{ required: false, message: '请输入个人简介', trigger: 'blur' }],
};