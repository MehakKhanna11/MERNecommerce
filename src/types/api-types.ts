import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";



export type CustomError={
    status:number;
    data:{
        message:string;
        success:boolean;
    }

}
export type MessageResponse={
    success:boolean;
    message:string;
}
export type AllUsersResponse={
    success:true;
    users:User[];
}
export type UserResponse={
    success:true;
    user:User;
}


export type AllProductsResponse={
    success:true;
    products:Product[],
}
export type ProductsResponse={
    success:true;
    product:Product,
}


export type CategoriesResponse={
    success:boolean;
    categories:string[];
}

export type SearchProductsResponse={
    success:true;
    products:Product[];
    totalPage:number;
}


export type StatsResponse={
    success:boolean;
    stats:Stats;
}
export type PieResponse={
    success:boolean;
    charts:Pie;
}
export type BarResponse={
    success:boolean;
    charts:Bar;
}
export type LineResponse={
    success:boolean;
    charts:Line;
}
export type DeleteUserRequest={
    userId:string;
    adminUserId:string;
}
export type SearchProductsRequest={
    price:number;
    page:number;
    category:string;
    search:string;
    sort:string;
}
export type NewProductRequest={
    id:string;
    formData:FormData;
}

export type UpdateProductRequest={
    userId:string;
    productId:string;
    formData:FormData;
}
export type DeleteProductRequest={
    userId:string;
    productId:string;
}
export type NewOrderRequest={
    orderItems:CartItem[];
    shippingInfo:ShippingInfo;
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    user:string;
}

export type UpdateOrderRequest={
    userId:string;
    orderId:string;
}

export type AllOrdersResponse={
    success:true;
    orders:Order[],
}

export type OrderDetailResponse={
    success:true;
    order:Order,
}