const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
            product: { 
                type: Object, 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true    
        }
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);