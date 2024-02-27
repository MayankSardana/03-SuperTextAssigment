import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';


const app = express();
const PORT = process.env.PORT || 9000
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
    return data.records;

    }catch(error)
    {
        console.error(error);
        throw error;
    }
}

async function getQuestions() {
    const records = await getAirtableData();
     return records;
}

app.get('/question' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.send(keywords[q].fields.Question);
})


app.get('/optionA' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.send(keywords[q].fields.OptionA);
})

app.get('/optionB' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.send(keywords[q].fields.OptionB);
})

app.get('/optionC' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.send(keywords[q].fields.OptionC);
})
app.get('/optionD' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.send(keywords[q].fields.OptionD);
})

app.get('/solution' , async(req , res)=>{
    let {q} = req.query;
    const keywords = await getAirtableData();    
    return res.send(keywords[q].fields.Solution);
})


 
app.get('/', (req, res) => {
    res.send('Hello from the Airtable data server');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
