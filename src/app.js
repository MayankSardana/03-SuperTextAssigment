import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 9000
const YOUR_SECRET_API_TOKEN = 'patWf7tZU8BIEZ2Pv.04f2f4c79ec651b90d1d8628c425a7b12c894eaed98180db7b9dab7ee427ce23';
const BASE_ID = 'appqKisbvF1bD5z4o';
const TABLE_NAME = 'Cricket';

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



app.get('/question' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.json(keywords[q].Question);
})
app.get('/A' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.json(keywords[q].A);
})

app.get('/B' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.json(keywords[q].B);
})

app.get('/C' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.json(keywords[q].C);
})

app.get('/D' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.json(keywords[q].D)
})

app.get('/solution' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.json(keywords[q].Solution);
})

 
app.get('/', (req, res) => {
    res.json('Hello from the Airtable data server');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
