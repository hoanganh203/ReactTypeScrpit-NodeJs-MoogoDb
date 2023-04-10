import react from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoryForm, CategorySchema } from "../models";
import { Category } from "../api/product";

const AddCategory = () => {

    const {
        register, handleSubmit, formState: { errors } } = useForm<CategoryForm>({
            resolver: yupResolver(CategorySchema)
        });

    const onSubmit = async (data: CategoryForm) => {
        try {
            const response = await Category(data)
            alert(response.data.message)
        } catch (error) {
            console.log(error);
        }
    }


    return <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-center">Thêm Danh mục</h1>
            <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="sr-only">Name Danh mục</label>

                    <div className="relative">
                        <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                            placeholder="Name danh mục"
                            {...register('name')}
                        />

                        <p className='text-red-600 text-[10px]'>
                            {errors.name && errors.name.message}

                        </p>

                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Thêm mới
                    </button>
                </div>
            </form>
        </div>

    </div >
}

export default AddCategory;