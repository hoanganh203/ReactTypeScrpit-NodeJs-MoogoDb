import Category from "../models/category";
import Product from "../models/product";
import joi from "joi";

const categorySchema = joi.object({
    name: joi.string().required(),
});

export const create = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }

        const data = await Category.create(req.body);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không thêm được danh mục",
            });
        }


        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data,
        });


    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}


export const getAll = async (req, res) => {
    try {
        const data = await Category.find();
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
};
export const getOne = async (req, res) => {
    try {

        const data = await Category.findById(req.params.id).populate("products");
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}

export const remove = async (req, res) => {
    try {

        const data = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa thành công",
            data,
        });

    } catch (error) {
        return res.json({
            message: error.message,
        });

    }
}
export const update = async (req, res) => {
    try {
        // const { data } = await axios.put(
        //     `http://localhost:3000/Categorys/${req.params.id}`,
        //     req.body
        // );

        const data = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật danh muc không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật danh muc thành công",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};


