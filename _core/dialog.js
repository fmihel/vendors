// const readline = require('readline');
// import {question} from 'readline';
import { createInterface } from 'node:readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Create a promise based version of rl.question so we can use it in async functions
const question = (str) => new Promise((resolve) => rl.question(str, resolve));
// const isStop = (text) => (!text || text === 'no' || text === '');

async function dialog_open(){
    return 1;
}
async function dialog_get_value(params={caption:"set value (default:?default)",default:""}){
    const p = {
        ...params,
    };
    p.caption = p.caption.replaceAll('?default',p.default);
    let value = await question(p.caption);
    if (value.trim() === '') {
        return p.default;
    }
    return value;
}

async function dialog_close(){
    rl.close();
}

export {
    dialog_open,
    dialog_close,
    dialog_get_value
}