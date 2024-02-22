

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';


const app = express();
const PORT = process.env.PORT || 7000
const YOUR_SECRET_API_TOKEN = 'patIHWbWN4xUjyUww.4287b75d4d56976c5dcc1d52839aaf1d47d62dfd70a9d2534450b570d27bf853';
const BASE_ID = 'appWaP6gqg97rFvY7';
const TABLE_NAME = 'IPL';

app.use(cors());


async function getAirtableData() {
    const endpoint = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    try{
        const response = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${YOUR_SECRET_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
    return data.records.map(record => record.fields);

    }catch(error)
    {
        console.error(error);
        throw error;
    }
}



app.get('/all', async(req, res) => {
    try {
        const keywords = await getAirtableData();
        res.send(keywords);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/question' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q].Question);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})
app.get('/custom' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q]);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})

app.get('/optionA' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q].OptionA);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})
app.get('/optionB' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q].OptionB);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})
app.get('/optionC' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q].OptionC);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})
app.get('/optionD' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q].OptionD);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})
app.get('/Solution' , async(req , res)=>{
    let {q} = req.query;
    try{
        const records = await getAirtableData();
        // console.log(records[q].Question)
        res.send(records[q].Solution);
    }catch(error){
    res.send("INTERNAL SERVER ERROR");
    }
})






app.get('/', (req, res) => {
    res.send('Hello from the Airtable data server');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});