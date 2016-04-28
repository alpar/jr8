var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.version = function(){
    var content = [
        '',
        '  fis: v' + fis.cli.info.version,
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







// --------------------------------
// 打印信息
// --------------------------------
var IS_RELEASE     = process.argv.indexOf('release') != -1;
var IS_PUBLISH     = process.argv.indexOf('publish') != -1;
var IS_PERFORMANCE = process.argv.indexOf('performance') != -1;

if (IS_RELEASE) {
    console.log('IS_PUBLISH    :' + IS_PUBLISH);
    console.log('IS_PERFORMANCE:' + IS_PERFORMANCE);
}










// --------------------------------
// 压缩优化
// --------------------------------
fis.config.merge({
    modules: {
        optimizer: {
            // js后缀文件会经过fis-optimizer-uglify-js插件的压缩优化
            js: 'uglify-js',
            css: 'clean-css' //, png : 'png-compressor'
        }
    },
    // 使用pngquant进行压缩，png图片压缩后均为png8
    // fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');
    settings: {
        optimizer: {
            'png-compressor': {
                type: 'pngquant'
            }
        }
    }
});









// --------------------------------
// js 模板支持
// --------------------------------
fis.config.set('modules.parser.tmpl', 'utc');
//fis.config.set('roadmap.ext.tmpl', 'js');
//fis.config.set('roadmap.ext.tpl', 'js');
//fis.config.merge({
//  settings: {
//      parser : {
//          'utc': {
//              variable: 'obj'
//          }
//      }
//  }
//});









// --------------------------------
// postpackager插件
// --------------------------------

var ppArr = fis.config.get('modules.postpackager') || [];


IS_PUBLISH     && ppArr.push('vmparse');
IS_PERFORMANCE && ppArr.push('performance-framework');

// performance-framework 一定要在 require-framework 之前，因为二者都用到了vm钩子
ppArr.push('require-framework');


fis.config.set('modules.postpackager', ppArr);
// fis.config.merge({ modules: { postpackager: ppArr } });











// --------------------------------
// 黄页  views/index.vm
// --------------------------------

if ( IS_RELEASE && !IS_PUBLISH ) {
    require('./jr8-yellowpage').run();
}

