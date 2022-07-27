function getCurrentTabId(callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}
// 这2个获取当前选项卡id的方法大部分时候效果都一致，只有少部分时候会不一样
function getCurrentTabId2() {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({
            active: true,
            windowId: currentWindow.id
        }, function (tabs) {
            if (callback) callback(tabs.length ? tabs[0].id : null);
        });
    });
}
//截图
// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);

        });
    });
}
// 向content-script注入JS片段
function executeScriptToCurrentTab(code) {
    // MutationObserver = function () { }
    getCurrentTabId((tabId) => {
        chrome.tabs.executeScript(tabId, {
            code: code
        });
    });
}


var codes = `var curlocal=window.location.host;
if(curlocal.indexOf('tusij.com')>0||curlocal.indexOf('eqxiu.com')>0){
    var style=document.createElement("style");style.innerHTML=".image-watermark,.eqc-watermark{width:0;height:0;position:static;z-index:-999;background-image:none;opacity:0;visibility:hidden !important;}";document.body.prepend(style);document.querySelector(".fixedWaterMaskButton").style.display="none";
document.querySelector(".image-watermark,.eqc-watermark").style.background="none";
 
}
else if(curlocal.indexOf('gaoding.com')>0||curlocal.indexOf('tubangzhu.com')>0){
    var style=document.createElement("style");style.innerHTML=".editor-watermark,.water-mark-wrap{position:static;z-index:-999;background-image:none;opacity:0;visibility:hidden !important;}";document.body.prepend(style);document.querySelector(".remove-watermark").style.display="none";
}
else if(curlocal.indexOf('818ps.com')>0||curlocal.indexOf('maka.im')>0){
    document.querySelector(".fixedWaterMaskButton,.poster-editor-watermark").style.display="none"
    var a=document.querySelectorAll(".image-watermark");for(n=0;n<a.length;n++){a[n].style.display="none"};
}
else if(curlocal.indexOf('58pic.com')>0||curlocal.indexOf('51mo.com')>0){
    document.querySelector(".no-vip-tip").style.display="none";  
    var style=document.createElement("style");style.innerHTML=".editor-watermark,.water-mark-wrap,.image-watermark{position:static;z-index:-999} .screen-tools{display:none}";document.body.prepend(style);
     
}
else if(curlocal.indexOf('chuangkit.com')>0||curlocal.indexOf('ibaotu.com')>0){
    document.querySelector(".water-mark,.remove-cktTemplate-watermark,.fixedWaterMaskBtn").style.display="none";
    document.querySelector(".image-watermark").style.display="none";       
    var style=document.createElement("style");style.innerHTML=".render-elem-item:after{position:relative !important;}";document.body.prepend(style);   
}
else if(curlocal.indexOf('picxiaobai.com')>0||curlocal.indexOf('fkw.com')>0){
    document.querySelector(".basePosition,.clear-mark-entrance,.watermark").style.display="none";
    document.querySelector('#clearMarkEntrance').remove()

}
else if(curlocal.indexOf('logomaker.com.cn')>0){
    
    var a=document.querySelectorAll(".watermark");for(n=0;n<a.length;n++){a[n].style.display="none"};
 
}
`
document.getElementById('test').addEventListener('click', function () {
    executeScriptToCurrentTab(codes)
})

//  document.styleSheets[0].insertRule(".render-elem-item:after{position:relative !important;}", 0);