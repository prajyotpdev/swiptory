const mongoose = require("mongoose");

const musicArtItemSchema = new mongoose.Schema({
     displayName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: { 
            validator: (value) => value >= 0,
            message: 'Price must be a non-negative number'
          }
        
    },
    colour: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: true,
    },
    aboutItem: {
        type: String,
        required: false,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    displayImageList: {
        type: Array,
        required: true,
        validate: { 
            validator: (value) => value.length > 0,
            message: 'displayImageList must contain at least one image URL'
          }
    },
});

module.exports = mongoose.model("MusicArtItem", musicArtItemSchema);