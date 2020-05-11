// ast语法树  对象描述原生语法 html语法
// 虚拟dom  对象描述dom节点 node节点对比

// abc-aaa
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// <aaa:vvv>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// 标签开头的正则 捕获内容是标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// 匹配标签结束
const startTagClose = /^\s*(\/?)>/ 
// 匹配标签结尾
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
// 匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 捕获{{}}里面的内容
const defaultTagRE = /\{\{( (?:.|\r?\n)+? )\}\}/g

export function compileToFunction(template) {
    //console.log(template);
    return function render() {
        
    }
}