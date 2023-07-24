// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// const connectionURL = "mongodb://localhost:27017";
// const databaseName = "task-manager";
// console.log("Starting");
// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     console.log("Inside");
//     if (error) {
//       return console.log("Unable to connect to database!");
//     }
//     console.log("Connected correctly");
//     const db = client.db(databaseName);

//     db.collection("users").insertOne(
//       {
//         name: "Andrew",
//         age: 27,
//       },
//       (error, result) => {
//         if (error) {
//           return console.log("Unable to insert user");
//         }

//         console.log(result.ops);
//       }
//     );
//   }
// );
