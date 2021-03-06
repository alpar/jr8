/**
 IMPORTANT:  
 
 modules.parser        { sass:node-sass, scss:node-sass, less:less, es6:[es5-2-es6], tmpl:utc }
 modules.postprocessor { js:[] }
 modules.postpackager  [ vmparse, framework-trace, require-framework ]
 
 have been defined.
 Please merge them via fis.config.get('modules...').push() if needed.
**/

var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.version = function(){
    var content = [
        '',
        '  jr8: v' + fis.cli.info.version,
        '',
        ' ________'                    + '|||'.bold.red + '____' + '|||||||||\\'.bold.yellow                                + '___________' + '||||||||||'.bold.green        + '____' + '||||||||||'.bold.blue,
        ' ________'                    + '|||'.bold.red + '____' + '|||'.bold.yellow + '______' + '||'.bold.yellow          + '__________' + '|||'.bold.green         + '___________' + '|||'.bold.blue + '____' + '|||'.bold.blue,
        ' ________'                    + '|||'.bold.red + '____' + '|||'.bold.yellow + '______' + '||'.bold.yellow          + '__________' + '|||'.bold.green         + '___________' + '|||'.bold.blue + '____' + '|||'.bold.blue,
        ' ________'                    + '|||'.bold.red + '____' + '|||'.bold.yellow + '______' + '||'.bold.yellow          + '__________' + '|||'.bold.green         + '___________' + '|||'.bold.blue + '____' + '|||'.bold.blue,
        ' ________'                    + '|||'.bold.red + '____' + '|||||||||/'.bold.yellow                                 + '___________' + '||||||||||'.bold.green        + '____' + '||||||||||'.bold.blue,
        ' ________'                    + '|||'.bold.red + '____' + '|||'.bold.yellow + ''      + '\\\\\\'.bold.yellow       + '______________________' + '|||'.bold.green    + '____' + '|||'.bold.blue + '____' + '|||'.bold.blue,
        ' ________'                    + '|||'.bold.red + '____' + '|||'.bold.yellow + '__'     + '\\\\\\'.bold.yellow      + '____________________' + '|||'.bold.green      + '____' + '|||'.bold.blue + '____' + '|||'.bold.blue,
        ' ' + '|||'.bold.red + '_____' + '|||'.bold.red + '____' + '|||'.bold.yellow + '____'    + '\\\\\\'.bold.yellow     + '__________________' + '|||'.bold.green        + '____' + '|||'.bold.blue + '____' + '|||'.bold.blue,
        ' '                    + '|||||||||||'.bold.red + '____' + '|||'.bold.yellow + '______'   + '\\\\\\'.bold.yellow    + '_________' + '||||||||||'.bold.green          + '____' + '||||||||||'.bold.blue,
        ''
    ].join('\n');
    console.log(content);
};







// ---------------
// 打印信息
// ---------------
var IS_RELEASE     = process.argv.indexOf('release') != -1;
var IS_PUBLISH     = process.argv.indexOf('publish') != -1;
var IS_TRACE       = process.argv.indexOf('trace') != -1;

if (IS_RELEASE) {
    console.log('IS_PUBLISH :' + IS_PUBLISH);
    console.log('IS_TRACE   :' + IS_TRACE);
}








// ---------------
// 标准过程流
// ---------------
fis.config.merge({
    modules: {
        optimizer: {
            // js后缀文件会经过fis-optimizer-uglify-js插件的压缩优化
            js: 'uglify-js',
            css: 'clean-css' //, png : 'png-compressor'
        },
        // 2016-6-12 为支持linux，改 fis-parser-sass 为 fis-parser-node-sass
        parser: {
            sass: 'node-sass',
            scss: 'node-sass',
            // 2016-8-23 支持less和ES6
            less: 'less',
            tmpl: 'utc',
            es6:  ['es6-2-es5']
        },
        // 2016-8-24 移除fis-postprocessor-jswrapper
        // 因为jello默认会给page目录下的所有js文件设置isMod=true
        // 会导致已注释开头的js文件多包含一层define
        // 重写postprocessor为[]，否则为string : jswrapper, require-async
        postprocessor: {
            // 2016-8-23 ES6需要wrapper
            js: [],
            vm: [],
            jsp: []
        }
        
        // 2016-6-13 改回fis-parser-sass，因为windows安装fis-parser-node-sass报错
        // Linux系统请取消上面注释，使用node-sass
    },
    // 使用pngquant进行压缩，png图片压缩后均为png8
    // fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');
    settings: {
        optimizer: {
            'png-compressor': {
                type: 'pngquant'
            }
        },
        postpackager: {
            'framework-trace': {
                traceModId: 'libs/core.trace'
            }
        }
        //,
        //project: {
        //  fileType: { text: 'es6' }
        //}
        //,
        //parser : { 
        //  'utc': { variable: 'obj' } 
        //}
    }
    
});


//fis.config.set('project.fileType.text','es6');










// ---------------
// postpackager插件
// ---------------

// trace 一定要在 require 之前，因为都用到了vm钩子
var ppArr = ['require-framework']; 
// fis.config.get('modules.postpackager') || []

IS_TRACE       && ppArr.unshift('framework-trace');
IS_PUBLISH     && ppArr.unshift('vmparse');

fis.config.set('modules.postpackager', ppArr);
// fis.config.merge({ modules: { postpackager: ppArr } });










// ---------------
// 黄页  views/index.vm
// ---------------

if ( IS_RELEASE && !IS_PUBLISH ) {
    require('./jr8-yellowpage').run();
}








// ---------------
// 打印信息
// ---------------
if ( IS_RELEASE ) {
    console.log('Below plugins have been provided in jr8:');
    console.log('--');
    console.log('parser');
    
    delete fis.config.get('modules.parser')['po'];
    console.log(fis.config.get('modules.parser'));
    console.log('--');
    console.log('postprocessor');
    console.log(fis.config.get('modules.postprocessor'));
    console.log('--');
    console.log('postpacker');
    console.log(fis.config.get('modules.postpackager'));
    
    //console.log( fis.config.get('settings') );
}




