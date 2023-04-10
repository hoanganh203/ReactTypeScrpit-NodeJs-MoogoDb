
import * as Yup from 'yup'

export interface ICategory {
    _id: string,
    name: string,
}

export interface Iproduct {
    _id: string,
    name: string,
    price: number,
    description: number,
    img: string,
    categoryId: string
}



export const signupSchema = Yup.object({
    name: Yup.string().required("Trường dữ liệu bắt buộc"),
    email: Yup.string().email("Email sai định dạng").required("Trường dữ liệu bắt buộc"),
    password: Yup.string().min(6).required("Trường dữ liệu bắt buộc"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp"),
})

export type SignupForm = Yup.InferType<typeof signupSchema>

export const signinSchema = Yup.object({
    email: Yup.string().email("Email sai định dạng").required("Trường dữ liệu bắt buộc"),
    password: Yup.string().min(6).required("Trường dữ liệu bắt buộc"),
    role: Yup.number()
})

export type SigninForm = Yup.InferType<typeof signinSchema>

export const CategorySchema = Yup.object({
    name: Yup.string().required("Trường dữ liệu bắt buộc"),
})

export type CategoryForm = Yup.InferType<typeof CategorySchema>

export const productAddSchema = Yup.object({
    name: Yup.string().required("Trường này là bắt buộc"),
    price: Yup.number().required("Trường này là bắt buộc"),
    description: Yup.string().required("Trường này là bắt buộc"),
    img: Yup.string().required("Trường này là bắt buộc"),
    categoryId: Yup.string().required("Trường này là bắt buộc"),
})

export type ProductAddForm = Yup.InferType<typeof productAddSchema>


export const productEditSchema = Yup.object({
    name: Yup.string().required("Trường này là bắt buộc"),
    price: Yup.number().required("Trường này là bắt buộc"),
    description: Yup.string().required("Trường này là bắt buộc"),
    img: Yup.string().required("Trường này là bắt buộc"),
    categoryId: Yup.string().required("Trường này là bắt buộc"),
})

export type ProductEditForm = Yup.InferType<typeof productEditSchema>