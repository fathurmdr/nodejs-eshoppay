
const configdb = {
    datbase:'demvukl1372kea',
    username:'akspvqendeqejv',
    password:'6fa743705a0ee75d85c2efc443fbdb6bbc67bff0eb18ce2c71a77f5a8fa60b85',
    host:'ec2-3-228-75-39.compute-1.amazonaws.com',
    port:'5432',
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}


export default configdb;

// import Sequelize from 'sequelize'
// import config from './config'
// const sequelize = new Sequelize(
//     config.db_name,
//     config.db_username,
//     config.db_password,
//     {
//         dialect: 'postgres'
//     },
// );

// sequelize
//     .authenticate()
//     .then(()=> console.log('Connection has been established successfully'))
//     .catch(err => console.log(err));

// export {sequelize};