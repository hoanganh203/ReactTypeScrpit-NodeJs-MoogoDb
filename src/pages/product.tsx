import { useEffect, useState } from "react";
import { Iproduct } from "../models";
import { getProduct } from "../api/product";
import { Link } from "react-router-dom";



const Product = () => {
    const [product, setProduct] = useState<Iproduct[]>([]);
    const Productall = async () => {
        const { data } = await getProduct();
        setProduct(data.data.docs);

    }
    useEffect(() => {
        Productall();
    }, [])
    return <>
        <Link to="/productAdd">
            Thêm mới
        </Link>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                <thead>
                    <tr>
                        <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                        >
                            Name
                        </th>
                        <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                        >
                            Price
                        </th>
                        <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                        >
                            img
                        </th>
                        <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                        >
                            description
                        </th>
                        <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                        >
                            categoryId
                        </th>
                        <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                        >
                            Chuc nang
                        </th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>

                {product.map((item: Iproduct) =>
                    <tr>
                        <td className="whitespace-nowrap px-1 py-2 font-medium text-white-900">
                            {item.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-white-700">{item.price}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-white-700"><img src={item.img} alt="" /></td>
                        <td className="whitespace-nowrap px-4 py-2 text-white-700">{item.description}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-white-700">{item.categoryId}</td>

                        <td className="whitespace-nowrap px-4 py-2">
                            <Link to={`/productEdit/${item._id}`} className="">
                                Sửa
                            </Link>

                        </td>
                    </tr>
                )}
            </table>
        </div>

    </>
}

export default Product;