import { StatusCodes } from "http-status-codes";

export function addToCart(req, res) {
    try {
        const { bookId } = req.body;
        if (!bookId) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "bookId is required",
                data: null
            });
        }
        let cart = [];
        if (req.session.borrowCart) {
            try {
                cart = JSON.parse(req.session.borrowCart);
            }
            catch (err) {
                cart = [];
            }
        }
        card.push(bookId);
        res.cookies("borrowCart", JSON.stringify(cart), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        return res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "Book added to cart",
            data: cart
        });

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null
        });
    }
}

export function viewCart(req, res) {
    try {
        let cart = [];
        if (req.session.borrowCart) {
            try {
                cart = JSON.parse(req.session.borrowCart);
            }
            catch (err) {
                cart = [];
            }
        }
        return res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "Cart retrieved",
            data: cart
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null
        });
    }
}