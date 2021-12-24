import formidable from 'formidable'
import fs from 'fs'

const uploadDir = process.cwd()+'/storages/'

const uploadImages = async (req,res,next) => {
    const options ={
        multiples : false,
        keepExtentions : true,
        uploadDir : uploadDir,
        maxFileSize : 50 * 1024 * 1024,
    }

    const form = formidable(options)
    let files = [];
    let fields = []

    form 
        .on('field',(fieldName, value)=>{
            fields.push({fieldName,value})
        })
        .on('file',(fieldName, file)=>{
            files.push( {...{fieldName, file}})
        })
        .on('end',()=>{
            console.log('Upload done');
            req.files = files
            req.fields = fields
            next()
        })
        form.parse(req)
}

export default{
    uploadImages,
}