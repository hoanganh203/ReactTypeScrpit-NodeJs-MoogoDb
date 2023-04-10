import Product from "../models/product";
import joi from 'joi';
import Category from "../models/category";



const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    img: joi.string().required(),
    categoryId: joi.string().required(),
});


export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.json({
                message: error.details.map((err) => err.message),
            });
        }


        const data = await Product.create(req.body);
        await Category.findByIdAndUpdate(data.categoryId, {
            $addToSet: {
                products: data._id,
            },
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không thêm được sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data,
        });


    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}


export const getAll = async (req, res) => {
    const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;
    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const data = await Product.paginate({}, options);
        console.log(data);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách All",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
}

export const getOne = async (req, res) => {
    try {

        const data = await Product.findById(req.params.id).populate("categoryId");
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách one",
            data,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}


export const update = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }

        const dataProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (dataProduct.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu"
            });

        }
        return res.status(200).json({
            message: "Update thành công",
            dataProduct,
        });


    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }


}



export const remove = async (req, res) => {
    try {
        const dataProduct = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa thành công",
            dataProduct,
        });


    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }


}