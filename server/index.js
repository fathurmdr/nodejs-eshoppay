import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import models,{sequelize} from "./models/init-models";
import routes from './routes/IndexRoute'
import middleware from "./middleware/middleware";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger-eshoppay.json'


const port = process.env.PORT || 1337;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(helmet())

app.use(compress())

app.use(cors());


app.use(async (req,res,next) =>{
    req.context = {models};
    next();
})


app.use(process.env.URL_API+"/category",routes.CateRoute)
app.use(process.env.URL_API+"/auth",routes.AuthRoute)
app.use(process.env.URL_API+"/product",routes.ProductRoute)

app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.use(middleware.handleError)
app.use(middleware.notFound)

const dropDatabaseSync = false;

sequelize.sync({force : dropDatabaseSync}).then(async ()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    });

})



export default app;