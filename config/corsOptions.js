const whitelists = [
    'http://localhost:5173',
    'https://portfolio-siraphob.vercel.app'
]

const corsOptions = {
    origin:(origin , callback)=>{
        if(whitelists.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;