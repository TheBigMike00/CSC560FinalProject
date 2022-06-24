const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    address: {
        type: String
    },
    propertyValue: {
        type: Number
    },
    monthlyIncome: {
        type: Number
    },
    monthlyExpenses: {
        type: Number
    }
})

module.exports = mongoose.model("OwnedProperties", PropertySchema, "OwnedProperties");