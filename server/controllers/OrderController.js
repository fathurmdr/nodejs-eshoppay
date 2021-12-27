const findAll = async (req, res) => {
    try {
        const result = await req.context.models.orders.findAll();
        return res.send(result);
    } catch (error) {
        return res.status(404).send("no data found");
    }
}

const findOne = async (req,res) => {
    try {
        const result = await req.context.models.orders.findOne({
            where:{order_name:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

const create = async (req,res)=>{
    const { order_name,order_total_qty,order_subtotal,order_discount,order_tax,order_address,order_phone,order_city,order_status,order_user_id } = req.body;
    
    const order_total_due = order_subtotal*(1-parseFloat(order_discount))*(1+parseFloat(order_tax));
    
    try {
        const result = await req.context.models.orders.create({
            order_name :order_name,
            order_creation :new Date(),
            order_total_qty :order_total_qty,
            order_subtotal :order_subtotal,
            order_discount :order_discount,
            order_tax :order_tax,
            order_total_due :order_total_due,
            order_address :order_address,
            order_phone :order_phone,
            order_city :order_city,
            order_status :order_status,
            order_user_id :order_user_id,
        });
        res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}

const update = async (req,res)=>{
    try {
        const result = await req.context.models.orders.update({
            order_name :order_name,
            order_creation :new Date(),
            order_total_qty :order_total_qty,
            order_subtotal :order_subtotal,
            order_discount :order_discount,
            order_tax :order_tax,
            order_total_due :order_total_due,
            order_address :order_address,
            order_phone :order_phone,
            order_city :order_city,
            order_status :order_status,
            order_user_id :order_user_id,
        },{
            returning : true, where:{order_name:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const deleteRow = async (req,res) =>{
    try {
        const result = await req.context.models.orders.destroy({
            where:{order_name: req.params.id}
        })
       return res.send("delete"+result+"rows")
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    deleteRow,
}