import { join, resolve } from 'path';

const define = {
    require_main_filename: '',

};

define.require_main_filename = resolve(join(import.meta.dirname, '../index.js'));

export default define;
