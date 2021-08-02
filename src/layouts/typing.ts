
export interface RouteType {
    path: string;
    breadcrumbName: string;
    children?: Array<{
        path: string;
        breadcrumbName: string;
    }>;
}

