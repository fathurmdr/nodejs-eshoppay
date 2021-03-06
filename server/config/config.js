const config = {
    env: process.env.NODE_ENV || 'development',
    port: 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    db_name : "eshopay",
    db_username : "postgres",
    db_password: "123456",
    URL_DOMAIN : '/eshopay',
    URL_IMAGE : 'http://localhost:3001/eshopay/api/product/images/',
    URL_API : '/eshopay/api',
    UPLOAD_DIR : '/storages'
  }
  
export default config