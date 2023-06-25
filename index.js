const MongoClient = require('mongodb').MongoClient;//this means that variable MongoClient requires a mongodb 

const uri = "mongodb://localhost:27017" //making a varaible uri and storing the mongo db connection link of the assignment databas

async function connection(){ //making a funciton  to connect to mongo db database 

const client = new MongoClient(uri);

    try{
        await client.connect(); //makes client as a collection 
        const db = client.db("blogging_platform")//this returns the database name,no need to await it donot returns a promise
        console.log(`connected to database - ${db.databaseName}`)

        // const collection = await db.collection()//this will return a promise //to see the collections
        // collection.forEach(c=>console.log(c.collectionName))
        const collectionName1 = 'Users';
        const collection1 = db.collection(collectionName1);

        const collectionName2 = 'Posts';
        const collection2 = db.collection(collectionName2);

        const Users = db.collection("Users");
        const Posts = db.collection("Posts");
        

        //console.log(await searchCursor.hasNext());
        // while(await searchCursor.hasNext()){
        //     console.log(await searchCursor.next())
        // }

        //Insert into the collection
        await Users.insertMany([
        {
            "Username":"Bhardwaj",
            "email":"axdx@gmail.com",
            "password":"12345678"
        },
        {
            "Username":"Kushagra",
            "email":"kush@gmail.com",
            "password":"12345678"
        },
        {
            "Username":"antrip",
            "email":"antrip@gmail.com",
            "password":"12345678"
        },
        {
            "Username":"kartikey",
            "email":"kartikey@gmail.com",
            "password":"12345678"
        },
        {
            "Username":"Aditya",
            "email":"aditya@gmail.com",
            "password":"12345678"
        },
    ])

    const currentDate = new Date(); 

    await Posts.insertMany([
        {
            "author":"Bhardwaj",
            "title":"Harry porter",
            "content":"fictional",
            "date":currentDate
        },
        {
            "author":"kushagra",
            "title":"Harry porter 2",
            "content":"fictional and horror",
            "date":currentDate
        },
        {
            "author":"Antrip",
            "title":"Harry porter 3 ",
            "content":"fictional and romance",
            "date":currentDate
        },
        {
            "author":"kartikey",
            "title":"Harry porter 4",
            "content":"fictional and fantasy",
            "date":currentDate
        },
        {
            "author":"Aditya",
            "title":"Harry porter 5 ",
            "content":"fictional and shonen",
            "date":currentDate
        },
    ])

    const searchCursor1 = await Users.find();
        //console.log(searchCursor);
        const result1 = await searchCursor1.toArray();
        console.table(result1)
        
        const searchCursor2 = await Posts.find();
        //console.log(searchCursor);
        const result2 = await searchCursor2.toArray();
        console.table(result2)
        

    // Update a document
    const updateFilter = { author: "Bhardwaj" };
    const updateData = { $set: { title: "Updated Title" } };
    await Posts.updateOne(updateFilter, updateData);

    // Read updated document
    const updatedDocument = await Posts.findOne(updateFilter);
    console.log("Updated Post:");
    console.log(updatedDocument);

    // Delete a document
    const deleteFilter = { author: "Antrip" };
    await Posts.deleteOne(deleteFilter);

    // Read remaining documents
    const remainingPosts = await Posts.find().toArray();
    console.log("Remaining Posts:");
    console.table(remainingPosts);



    }catch(ex){
        console.error("You ran into an error "+ex)
    }
    finally{
        client.close();
    }

}


connection();