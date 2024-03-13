import axios from "axios";
import { displaySuccessMessage,displayErrorMessage } from "@/utils";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_HOST
});

// ========FETCH(GET) Property with filter==============
export const fetchPropertyApi=async(propertyFilter={})=>{
    try{
        const response=await api.get('property',{
            params:propertyFilter
        });
        return response;
    }catch(error){
        displayErrorMessage('Something went wrong');
        console.log(error);
    }
}
// ===================================================
