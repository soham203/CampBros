const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seeDB = async () => {
    await Campground.deleteMany({}); // Important!!! 
    for (let i = 0; i <50 ; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at quasi velit fugiat eaque! Necessitatibus, sapiente? Sapiente impedit aspernatur aut officiis inventore molestias et. Porro dolorum impedit reiciendis commodi ea.",
            price
        });
        await camp.save();
    };
};

seeDB().then(() => {
    mongoose.connection.close();
})