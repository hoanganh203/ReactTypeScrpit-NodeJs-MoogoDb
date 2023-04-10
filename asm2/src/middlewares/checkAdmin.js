import jwt from "jsonwebtoken";
import User from "../models/user";


export const checkAdmin = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập",
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "12345678", async (error, decoded) => {
        if (error === "JsonwebTokenError") {
            return res.json({ message: error })
        }
        const data = await User.findById(decoded.id);
        if (data.role !== "admin") {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập tài nguyên này",
            });
        }

        req.data = data;
        next();
    });


}