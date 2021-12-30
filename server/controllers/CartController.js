const isCartOpen = async (req, res, next) => {
    const { user_id, prod_id, price, qty } = req.body;
    try {
        const result = await req.context.models.cart.findOrCreate({
            where: { cart_user_id: parseInt(user_id), cart_status: 'OPEN' },
            defaults: {
                cart_created_on: new Date(),
                cart_status: 'OPEN',
                cart_user_id: user_id
            }
        });

        req.carts = ({
            cart: result[0].dataValues,
            product: { prod_id, price, qty }
        });

        next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const saveLineItem = async (req, res) => {
    const { cart, product } = req.carts;
    // create product
    try {
        const result = await req.context.models.line_items.findOrCreate({
            where: { lite_cart_id: cart.cart_id, lite_prod_id: product.prod_id },
            defaults: {
                lite_cart_id: parseInt(cart.cart_id),
                lite_prod_id: parseInt(product.prod_id),
                lite_price: parseFloat(product.price),
                lite_qty: parseInt(product.qty),
                lite_subtotal: parseInt(product.qty) * parseFloat(product.price),
                lite_status: 'OPEN',
                lite_order_name: null
            }
        });

        //update product if data already exist
        if (result[1] === false) {
            try {
                await req.context.models.line_items.update(
                    {
                        lite_price: parseFloat(product.price),
                        lite_qty: parseInt(product.qty),
                        lite_subtotal: parseInt(product.qty) * parseFloat(product.price)
                    },
                    { returning: true, where: { lite_cart_id: cart.cart_id, lite_prod_id: product.prod_id } }
                );
                res.send({ message: 'cart has been update' })
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
        } else {
            res.send({ message: 'cart has been add' })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const checkout = async (req, res, next) => {
    const lineItems = req.body;
    try {
        await lineItems.forEach(el => {
            req.context.models.line_items.update(
                {
                    lite_price: parseFloat(el.price),
                    lite_qty: parseInt(el.qty),
                    lite_subtotal: parseInt(el.qty) * parseFloat(el.price),
                    lite_status : 'CHECKOUT'
                },
                { returning: true, where: { lite_cart_id: el.cart_id, lite_prod_id: el.prod_id } }
            );
        });
        req.cartId = lineItems[0].cart_id;
        next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateCart = async (req, res) => {
    const cart_id = req.cartId;
    //update cart status
    try {
        await req.context.models.cart.update(
            {
                cart_status: 'CHECKOUT'
            },
            {returning : true, where : {cart_id : parseInt(cart_id)}} 
        );
        res.send({message : 'data has been update'})
    } catch (error) {
        res.status(404).json({message : error.message})
    }

}

const summaryCart = async (req,res,next)=>{
    const {cart_id} = req.body;

    try {
        const result = await req.context.models.line_items.findAll({
            where : {lite_cart_id : cart_id, lite_status : 'CHECKOUT'}
        });

        const lineItems = result;
        const Prod = lineItems.map(el => ({prod_id: el.lite_prod_id, qty : el.lite_qty}))
        const totalQty = lineItems.reduce((total,el)=> total+el.lite_qty,0)
        const subTotal = lineItems.reduce((total,el)=> total+ parseFloat(el.lite_subtotal),0)

        req.Prod = Prod;
        req.summaryCart=({
            summary : {
                totalQty : totalQty,
                subTotal : subTotal,
            }
        });

        next();

    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

const updateLineItemOrder = async (req, res,next) => {
    const {cart_id} = req.body
    //update line_item status
    try {
        await req.context.models.line_items.update(
            {
                lite_status: 'ORDERED',
                lite_order_name: req.orderName
            },
            {returning : true, where : {lite_cart_id : parseInt(cart_id)}} 
        );
        next();
    } catch (error) {
        res.status(404).json({message : error.message})
    }

}

const updateCartOrder = async (req, res) => {
    const {cart_id} = req.body
    //update cart status
    try {
        await req.context.models.cart.update(
            {
                cart_status: 'CLOSED'
            },
            {returning : true, where : {cart_id : parseInt(cart_id)}} 
        );
        res.send({message : 'data has been update'})
    } catch (error) {
        res.status(404).json({message : error.message})
    }

}

export default {
    isCartOpen,
    saveLineItem,
    checkout,
    updateCart,
    summaryCart,
    updateLineItemOrder,
    updateCartOrder
}