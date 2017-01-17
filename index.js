/**
 * 把widget嵌入到内容中
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象 [fis3/lib/file.js]
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 */
module.exports = function(content, file, settings) {
    var fs = require('fs');
    var notCommentWidget = /^(<!--){0}[.\n\t\r\s]*{%widget\s.*?name="(.*?)".*?%}[.\n\r\t\s]*(-->){0}$/img;
    var result = content.match(notCommentWidget);
    var widgetReg = /{%widget\\s.*?name="(.*?)".*?%}/;
    var widgets = settings.widgets;

    content = content.replace(notCommentWidget,function(item,g1,g2){
    	var conUrl = process.cwd()+'/widget/'+g2+'@'+widgets[g2]+'/'+g2;
    	conUrl = conUrl.replace(/\\/g,'/');
    	if(fs.existsSync(conUrl+'.html')){
			conUrl = conUrl+'.html';
		}
		if(fs.existsSync(conUrl+'.ftl')){
			conUrl = conUrl+'.ftl';
		}
		if(!fis.util.realpath(conUrl)){
			fis.log.error('widget name ['+g2+'] is not exist;');
		}else{
			var widgetCon = fis.util.read(conUrl);
			widgetCon = '<!--widget '+g2+' start-->\r\n'+widgetCon+'\r\n<!--widget '+g2+' end-->\r\n';
		}
		
		return widgetCon;
    })
    
    return content;
};
