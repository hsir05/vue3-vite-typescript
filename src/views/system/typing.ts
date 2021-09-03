
export interface DataItem {
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