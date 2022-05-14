const mongoose = require('mongoose');

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            //useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
        });
        console.log('Db is connected successfully');
    }catch(err){
        console.log(`Error ${err.message}`);
    }
};

module.exports = dbConnect;