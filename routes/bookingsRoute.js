const router=require("express").Router();
const Booking = require("../models/bookingModel");
const Bus = require("../models/busModel");
const stripe = require("stripe")(process.env.stripe_key);
const {v4: uuidv4 } = require('uuid');
//book a seat

router.post("/book-seat",async(req,res)=>{
   try{
     const newBooking = new Booking({
        ...req.body,
        transactionId : '1234',
        user:req.body.userId
     });
     await newBooking.save();
     const bus= await Bus.findById(req.body.bus);
     bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
     await bus.save();
      res.status(200).send({
        message:"Booked successfully",
        data: newBooking,
        success: true
     })
   }catch(error){
    res.status(500).send({
        message:"Booked failed",
        data: error,
        success: false,
    });

   }
});

//making payment

router.post("/make-payment",async(req,res) =>{
   try {
      const{token , amount} = req.body;
      const customer = await stripe.customers.create({
         email: token.email,
         source: token.id
      })
      const payment = await stripe.charges.create({
         amount: amount ,
         currency:"inr",
         customer: customer.id,
         receipt_email: token.email,
        

      },{
         idempotencyKey: uuidv4(),
      });
      if(payment){

         res.status(200).send({
            message:"payement successfull",
            data:{
               transactionId:payment.source.id,
            },
            success:true,
         });
      }else{
         res.status(500).send({
            message:"payement failed",
            data:error,
            success:false,
         });
      }
      
   } catch (error) {
      console.log(error)
      res.status(500).send({
         message:"payment failed",
         data:error,
         success:false,
   });
}
})

module.exports = router;


