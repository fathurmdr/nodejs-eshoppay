const create = async (req,res)=>{
    const files = req.files
    const fields = req.fields
    const productId = req.productId
    const productUrlImg = req.productUrlImg
    try {
        const result = await req.context.models.product_images.create({
            prim_filename : files[0].file.newFilename,
            prim_filesize : parseInt(fields[8].value),
            prim_filetype : fields[9].value,
            prim_primary : fields[10].value === 'true',
            prim_prod_id : productId,
            prim_url: productUrlImg
        })
        res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}

export default {
    create
}