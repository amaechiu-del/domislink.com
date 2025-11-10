import express from 'express';
const app = express();
app.get('/api/health',(req,res)=>res.json({ok:true,service:'domislink-backend'}));
app.listen(3000,()=>console.log('Backend running'));
