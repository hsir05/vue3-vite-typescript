//validator.ts

export const rules = {
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
};