import mongoose from 'mongoose';

const subscriptionScema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Subscription name is required"] ,
        trim: true ,
        minLength:2,
        maxLength:100,
    },
    price:{
        type: Number,
        required:[true, "Subscription price is required"] ,
        min:[0, "Price cannot be negative"],
    },
    currency:{
        type: String,
        required:[true, "Currency is required"] ,
        trim: true ,
        uppercase: true,
        enum:["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"],
        default:"USD",
    },
    frequency:{
        type: String,
        required:[true, "Subscription frequency is required"] ,
        trim:true,
        lowercase:true,
        enum:["daily", "weekly", "monthly", "yearly"],
    },
    catogory:{
        type: String,
        required:[true, "Subscription catogory is required"] ,
        trim:true,
        lowercase:true,
        enum:["entertainment", "productivity", "education", "health", "other"],
    },
    paymentMethod:{
        type:String,
        required:[true,"Payment method is required"],
        trim:true,
        lowercase:true,
        enum:["credit card", "debit card", "paypal", "bank transfer", "other"], 
    },
    status:{
        type:String,
        required:[true,"Subscription status is required"],
        trim:true,
        lowercase:true,
        enum:["active", "cancelled", "expired"],
        default:"active",
    },
    startDate:{
        type:Date,
        required:[true,"subscription start date is required"],
        validate: {
            validator:(value)=>{
                return value <= new Date();
            },
            message:"Start date cannot be in the future",
        }
    },
    renewalDate:{
        type:Date,    
        validate: {
            validator:(value)=>{
                return value > new Date();  
            },
            message:"Renewal date must be in the future",
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true,
    }

},{timestamps:true})

subscriptionScema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalINterwals = {daily:1,weekly:7,monthly:30,yearly:365,};
        this.renewalDate =  new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalINterwals[this.frequency]);
    }
    if(this.renewalDate < this.startDate){
        this.renewalDate = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionScema);

export default Subscription ;