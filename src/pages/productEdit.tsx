import { useEffect, useState } from "react";
import { Editproduct, getCategory, getone, productAdd } from "../api/product";
import { CategoryForm, ICategory, Iproduct, ProductAddForm, ProductEditForm, productAddSchema, productEditSchema } from "../models";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from "react-router-dom";


const ProductEdit = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm<ProductEditForm>({
        resolver: yupResolver(productEditSchema),
        defaultValues: async () => {
            if (id) {
                return await getProductall(id)
            }
        }
    })

    const [category, setCategory] = useState<ICategory[]>([]);
    const CategoryAll = async () => {
        const { data } = await getCategory();
        setCategory(data.data);
    }
    useEffect(() => {
        CategoryAll();
    }, [])

    const getProductall = async (id: any) => {
        const { data } = await getone(id)
        return data.data;

    }

    const onSubmit = async (data: ProductEditForm) => {
        const response = await Editproduct(id, data)
        console.log(response)
    }



    return <>
        <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            At the same time, the fact that we are wholly owned and totally
                            independent from manufacturer and other group control gives you
                            confidence that we will only recommend what is right for you.
                        </p>

                        <div className="mt-8">
                            <a href="" className="text-2xl font-bold text-pink-600">
                                0151 475 4450
                            </a>

                            <address className="mt-2 not-italic">
                                282 Kevin Brook, Imogeneborough, CA 58517
                            </address>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="sr-only">Name</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Name"
                                    type="text"
                                    {...register('name')}
                                />
                                <p className='text-red-600 text-[10px]'>

                                    {errors.name && errors.name.message}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" >Price</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Price"
                                        type="number"
                                        {...register('price')}

                                    />
                                    <p className='text-red-600 text-[10px]'>

                                        {errors.price && errors.price.message}
                                    </p>
                                </div>

                                <div>
                                    <label className="sr-only">Img</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Img"
                                        id="fileItem"
                                        {...register('img')}
                                    />
                                    <p className='text-red-600 text-[10px]'>

                                        {errors.img && errors.img.message}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                <select {...register('categoryId')}>

                                    <option value="">Chọn danh mục
                                    </option>
                                    {category.map((item: ICategory) => <option value={item._id}>{item.name}</option>)}
                                </select>
                                <p className='text-red-600 text-[10px]'>
                                    {errors.categoryId && errors.categoryId.message}
                                </p>
                            </div>

                            <div>
                                <label className="sr-only">Mô tả</label>

                                <textarea
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Mô tả"
                                    {...register('description')}
                                ></textarea>
                                <p className='text-red-600 text-[10px]'>

                                    {errors.description && errors.description.message}
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    </>
}

export default ProductEdit;