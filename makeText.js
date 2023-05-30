/** Command-line tool to generate Markov text. */

const MarkovMachine = require('./markov');
const fs = require('fs');
const process = require('process');
const axios = require('axios');


function generateText(text) {
    let mm = new MarkovMachine(text)
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf8', function cb(err, data) {
        if (err) {
            console.log('ERROR', err)
            process.exit(1);
        }
        else {
            generateText(data);
        }
    });
}

async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
    }
    catch (err) {
        console.error('ERROR', err)
        process.exit(1)
    }
}

let [method, path] = process.argv.slice(2);

if (method === 'file') {
    makeText(path)
}

else if (method === 'url') {
    makeURLText(path)
}

else {
    console.error('Unknown Method')
    process.exit(1)
}
