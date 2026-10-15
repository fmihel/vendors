const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const LIGHT_BLUE = '\x1b[36m';
const RESET = '\x1b[0m'; // Сбрасывает цвет обратно к стандартному

function colorize(str, COLOR
) {
    return `${COLOR}${str}${RESET}`;
}

export{
    YELLOW,RED,GREEN,BLUE,LIGHT_BLUE,RESET,colorize
}