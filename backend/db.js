// // const e = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// const mongoURI='mongodb://shivambefoodie:Velarlove1@ac-t45zrar-shad-00-00.2hynzwi.mongodb.net/BeFoodieMERN:27017,ac-t45zrar-shard-00-01.2hynzwi.mongodb.net:27017,ac-t45zrar-shard-00-02.2hynzwi.mongodb.net:27017/?ssl=true&replicaSet=atlas-82es00-shard-0&authSource=admin&retryWrites=true&w=majority';
const mongoURL='mongodb+srv://shivambefoodie:Velarlove1@cluster0.2hynzwi.mongodb.net/BeFoodieMERN?retryWrites=true&w=majority';
const mongoDB = async() =>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true}, async(err,result)=>{
        if(err){
        console.log("---",err);
        }
        else{
        console.log('connected');
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){
            const foodCategory = await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err,catData){

                 if(err)   console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                }

            })
            // if(err)   console.log(err);
            // else {
            //     global.food_items = data;
            //     // console.log(global.food_items);
            // }
        })
    }
})}
module.exports = mongoDB;



// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI = 'mongodb+srv://shivambefoodie:Velarlove1@cluster0.2hynzwi.mongodb.net/BeFoodieMERN?retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// // module.exports = function (callback) {
//     const mongoDB = async() =>{
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const fetched_data = await mongoose.connection.db.collection("food_items");
//             // foodCollection.find({}).toArray(async function (err, data) {
//             //     const categoryCollection = await mongoose.connection.db.collection("Categories");
//             //     categoryCollection.find({}).toArray(async function (err, Catdata) {
//             //         callback(err, data, Catdata);
//             fetched_data.find().toArray( function(err,data){
//                             if(err)   console.log(err);
//                             else     console.log(data);
//                 //         })

//                 // })
//             });
//             // listCollections({name: 'food_items'}).toArray(function (err, database) {
//             // });
//             //     module.exports.Collection = database;
//             // });
//         }
//     })
// };

// module.exports = mongoDB;
