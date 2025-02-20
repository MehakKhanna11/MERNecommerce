import { NavigateFunction } from "react-router-dom";
import { MessageResponse } from "../types/api-types";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import moment from "moment";

type ResType= {
    data?:MessageResponse;
    error?:FetchBaseQueryError|SerializedError;
}
export const responseToast=(res:ResType,navigate:NavigateFunction|null,url:string)=>{
    if(res.data){
        toast.success(res.data.message);
    }
    if(navigate){
        navigate(url)
    }
    else{
        const error=res.error as FetchBaseQueryError;
        const messageResponse=error.data as MessageResponse;
        toast.error(messageResponse.message);
    }
}

export const getLastMonths=()=>{
    const currentDate=moment();
    currentDate.date(1);
    const lastSixMonths:string[]=[];
    const lastTwelveMonths:string[]=[];
    for(let i=0;i<6;i++){
        const monthDate=currentDate.clone().subtract(i,"months");
        const monthName=monthDate.format("MMMM");
        lastSixMonths.unshift(monthName);
    }
    for(let i=0;i<12;i++){
        const monthDate=currentDate.clone().subtract(i,"months");
        const monthName=monthDate.format("MMMM");
        lastTwelveMonths.unshift(monthName);
    }
    return {lastSixMonths,lastTwelveMonths};

}