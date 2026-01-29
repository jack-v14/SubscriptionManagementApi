import { Router } from  'express' ;
const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>{res.send({title:"GET all subscriptions "})});
subscriptionRouter.get('/:id',(req,res)=>{res.send({title:"GET one subscription "})});
subscriptionRouter.post('/',(req,res)=>{res.send({title:"CREATE one subscription "})});
subscriptionRouter.put('/:id',(req,res)=>{res.send({title:"UPDATE one subscription "})});
subscriptionRouter.delete('/:id',(req,res)=>{res.send({title:"DELETE one subscription "})});
subscriptionRouter.get('/user/:id',(req,res)=>{res.send({title:"GET all user subscriptions "})});
subscriptionRouter.get('/upcomming-renewals',(req,res)=>{res.send({title:"GET upcommming renewals "})});
subscriptionRouter.put('/:id/cancel',(req,res)=>{res.send({title:"CANCEL one subscription "})});

export default subscriptionRouter ;