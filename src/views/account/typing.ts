
export interface FormState {
    email: string;
    nickname: string;
    phone: string;
    introduce?: string;
}

export interface DataItem {
    title: string;
    description: string;
}

export interface BindingDataItem {
    icon: string;
    title: string;
    description: string;
}
export interface DepFormState{
    username: string;
    nickname: string;
}
export interface Department {
    username: string;
    nickname: string;
    email: string;
    role: string;
    id: string | number;
    createTime: string;
    remark?: string;
}