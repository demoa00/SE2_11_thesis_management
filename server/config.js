require('dotenv').config()
exports.config = ()=>{
    if (process.env.DOCKER_CONFIG === 'DOCKER') {
        return {
            corsConfig: 'http://localhost',
            redirectUrl: 'http://localhost:80'
        }
    }
    else{
        return {
            corsConfig:'http://localhost:4200',
            redirectUrl:'http://localhost:4200'
        };
    }
}
