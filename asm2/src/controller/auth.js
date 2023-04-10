import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../validate/auth"

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        console.log("error", error);

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Kiểm tra xem user đã đk chưa?
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // không trả về password
        const token = jwt.sign({ id: data._id }, "12345678", { expiresIn: "1d" });

        data.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};


export const signin = async (req, res) => {


    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        };

        //Kiểm tra xem user đã đki chưa ? 
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        // So sánh mật khẩu

        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }

        const token = jwt.sign({ id: data._id }, "12345678", { expiresIn: "1d" });
        data.password = undefined;

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            data,
        });

    } catch (error) {
        return res.status(400).json({
            message: error,

        });
    };
};