import express from 'express';

const app = express() ;

app.get('/',(req,res)=>{
    res.send("welcome to subscription traking API");
});

app.listen(3000,()=>{
    console.log("server running on port http://localhost:3000" );
})

export default app; 