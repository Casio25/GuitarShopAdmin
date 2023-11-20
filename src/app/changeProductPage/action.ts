import { ILoginStore } from "../utils/interface/ILogin.js";
interface IProductData {
    id: number | null;
    productName: string;
    photo: string;
    price: number | null;
    type: string;
    string: string;
    [key: string]: string | number | null; // Index signature
}
export const changeProduct = async(updatedProductData: IProductData, LoginStore: string)=>{
    console.log("data to update", updatedProductData)
    console.log("token during updating: ", LoginStore)
    try{
        fetch("http://localhost:4000/catalog/change", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${LoginStore}` },
            body: JSON.stringify(updatedProductData)
        })
    }catch(error){
        console.error("error in changing product action", error)
    }
}