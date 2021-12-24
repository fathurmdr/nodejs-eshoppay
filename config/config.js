// const config = {
//     env: process.env.NODE_ENV || 'development',
//     port : process.env.PORT || 3001,
//     jwtScret : process.env.JWT_SECRET || "Your_secret_key",
//     db_name : "ecommerce",
//     db_username : "postgres",
//     db_password : "123456",
//     URL_DOMAIN : ""
// }


// DB from heroku
const config = {
    env: process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3001,
    jwtScret : process.env.JWT_SECRET || "Your_secret_key",
    db_name : "demvukl1372kea",
    db_username : "akspvqendeqejv",
    db_password : "6fa743705a0ee75d85c2efc443fbdb6bbc67bff0eb18ce2c71a77f5a8fa60b85",
    URL_DOMAIN : "postgres://akspvqendeqejv:6fa743705a0ee75d85c2efc443fbdb6bbc67bff0eb18ce2c71a77f5a8fa60b85@ec2-3-228-75-39.compute-1.amazonaws.com:5432/demvukl1372kea"
}

export default config