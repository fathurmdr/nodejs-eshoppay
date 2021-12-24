const findAll = async (req, res) => {
    try {
        const result = await req.context.models.products.findAll();
        return res.send(result);
    } catch (error) {
        return res.status(404).send("no data found");
    }
}

const findOne = async (req,res) => {
    try {
        const result = await req.context.models.products.findOne({
            where:{prod_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

const create = async (req,res,next)=>{
    const fields = req.fields;
    try {
        const result = await req.context.models.products.create({
            prod_name : fields[0].value,
            prod_price : fields[1].value,
            prod_desc : fields[2].value,
            prod_url_image : fields[3].value,
            prod_rating : fields[4].value,
            prod_view_count : fields[5].value,
            prod_user_id : fields[6].value,
            prod_cate_id : fields[7].value,
        });
        req.productId = result.dataValues.prod_id
        req.productUrlImg = result.dataValues.prod_url_image
        next()
    } catch (error) {
        return res.status(404).send("no data input")
    }
}

const update = async (req,res)=>{
    try {
        const result = await req.context.models.products.update({
            prod_name : req.body.prod_name,
            prod_price : req.body.prod_price,
            prod_desc : req.body.prod_desc,
            prod_url_image : req.body.prod_url_image,
            prod_rating : req.body.prod_rating,
            prod_view_count : req.body.prod_view_count,
            prod_user_id : req.body.prod_user_id,
            prod_cate_id : req.body.prod_cate_id
        },{
            returning : true, where:{prod_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const create1 = async (req,res)=>{
    const {files,fields} = req.fileAttrb
    try {
        const result = await req.context.models.products.create({
            first_name : fields[0].value,
            last_name : fields[1].value,
            email : fields[2].value,
            phone_number : fields[3].value,
            hire_date : new Date(),
            job_id : parseInt(fields[4].value),
            salary : fields[5].value,
            manager_id : parseInt(fields[6].value),
            department_id : parseInt(fields[7].value),
            profile:files[0].file.newFilename,
            fields:files[1].file.newFilename
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}

const deleteRow = async (req,res) =>{
    try {
        const result = await req.context.models.products.destroy({
            where:{employee_id: req.params.id}
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
    create1,
    deleteRow,
}