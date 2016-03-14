var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');









// --------------------------------
// 打印信息
// --------------------------------
if (/\brelease\b/i.test(process.title)) {

	var IS_PUBLISH     = /\bpublish\b/i.test(process.title);
	var IS_PERFORMANCE = /\bperformance\b/i.test(process.title);

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


/\bpublish\b/i.test(process.title) && ppArr.push('vmparse');
/\bperformance\b/i.test(process.title) && ppArr.push('performance-framework');

// performance-framework 一定要在 require-framework 之前，因为二者都用到了vm钩子
ppArr.push('require-framework');



fis.config.set('modules.postpackager', ppArr);

/**
fis.config.merge({
    modules: {
        postpackager: ppArr
    }
});
**/