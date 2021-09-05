
export interface roleDataItem {
    roleName: string;
    code: string;
    id: number | string,
    status: string;
    createTime: string;
    remark: string
}
export interface FormState {
    status: string;
    roleName: string;
}

export interface userDataItem {
    userName: string;
    code: string;
    id: number | string,
    status: string;
    createTime: string;
    remark: string
}
export interface userFormState {
    status: string;
    userName: string;
}