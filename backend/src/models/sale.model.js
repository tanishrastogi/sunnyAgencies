import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    monthly_sale: {
        January: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        February: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        March: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        April: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        May: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        June: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        July: {
            total_sale: {
                type: Number,
                default: 0.
            }
        },
        August: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        September: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        October: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        November: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        },
        December: {
            total_sale: {
                type: Number,
                default: 0.0
            }
        }
    },
    peak_sale_month: [
        {
            month_name: String,
            sale: Number
        }
    ]

})

const sale_rate_schema = new mongoose.Schema({
    mrp: {
        type: String
    },
    pur_rate: {
        type: String
    },
    sale_rate: String,
    quantity: String,
    discount: {
        deal: {
            type: String,
            default: '0+0'
        },
        disc: {
            type: String,
            default: '0'
        }
    },
    bill_number: String,
    bill_date:String    
})

const item_saleSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    tags:{
        type:[String]
    }, 
    item_sale_data: [saleSchema],
    sale_rate: mongoose.Schema.Types.ObjectId
})



const ItemSale = new mongoose.model('itemsales', item_saleSchema);
const SaleRate = new mongoose.model('sale_rates', sale_rate_schema);

export { ItemSale, SaleRate };
