//引入子进程模块
const cp = require('child_process');
const {saveMovieFile} = require('./douban')
const {resolve} = require('path');
(async ()=>{
    const script = resolve(__dirname, '../crawler/puppeteer.js');
    const child = cp.fork(script, []);
    let invoked = false;

    child.on('error',(err)=>{
        if(invoked) return;
        invoked = true;
    });
    child.on('exit',code => {
        if(invoked) return;
        invoked = true;
        let err = code === 0 ? null : new Error('exit code:' + code);
    });

    child.on('message', data => {
        let result = data.result;
        console.log(result)
        saveMovieFile(result)
    });
})();
