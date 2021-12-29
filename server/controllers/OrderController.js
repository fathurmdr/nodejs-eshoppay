import { sequelize } from "../models/init-models"

const getOrderNumber = async (req,res,next)=>{
    try {
        const result = await sequelize.query("select 'ORD-'||to_char(now(),'DDMMYYY')||lpad(nextval('order_name_seq')||'',4,'0') as ordername",
        {
            type : sequelize.QueryTypes.SELECT
        })
        req.orderName = result[0].ordername;
        next();
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

const createOrder = async (req,res)=>{
    const {summary} = req.summaryCart;
    const {order_discount,order_tax,order_city,order_address,order_status,order_user_id} = req.body;
    
    try {
        const result = await req.context.models.orders.create({
            order_name : req.orderName,
            order_created_on : new Date(),
            order_total_qty : summary.totalQty,
            order_subtotal : summary.subTotal,
            order_discount : order_discount,
            order_tax : order_tax,
            order_city : order_city,
            order_address : order_address,
            order_status : order_status,
            order_total_due : summary.subTotal,
            order_user_id : parseInt(order_user_id)
        })    
        res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }   
}

export default {
    getOrderNumber,
    createOrder
}