import { CategoryForm, Iproduct, ProductAddForm, ProductEditForm, SigninForm, SignupForm } from "../models";
import instance from "./instance"

export const getall = () => {
    return instance.get("/products");

}

export const getCategory = () => {
    return instance.get("/categorys");

}


export const getProduct = () => {
    return instance.get("/products");

}

export const getone = (id: any) => {
    return instance.get(`/products/${id}`);
}
// export const addProduct = (data) => {
//     return instance.post("/products", data, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')} `
//         }
//     });
// }

export const Editproduct = (_id: string | undefined, data: ProductEditForm) => {
    return instance.put(`/products/${_id}`, data);
}


export const Category = (data: CategoryForm) => {
    return instance.post("/categorys", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')} `
        }
    })
}

export const productAdd = (data: ProductAddForm) => {
    return instance.post("/products", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')} `
        }
    })
}

export const signin = (data: SigninForm) => {
    return instance.post("/signin", data);
}

export const signup = (data: SignupForm) => {
    return instance.post("/signup", data);
}