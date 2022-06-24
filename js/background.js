//-------------------- 右键菜单演示 ------------------------//
chrome.contextMenus.create({
	title: "测试右键菜单",
	onclick: function(){
		chrome.notifications.create(null, {
			type: 'basic',
			iconUrl: 'img/icon.png',
			title: '真牛！这你都会测试了！',
			message: '真牛！这你都会测试了！'
		});
	}
});
 

 
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

// $('#test_cors').click((e) => {
// 	$.get('https://www.baidu.com', function(html){
// 		console.log( html);
// 		alert('跨域调用成功！');
// 	});
// });

document.getElementById('get_popup_title').click(e => {
	var views = chrome.extension.getViews({type:'popup'});
	if(views.length > 0) {
		alert(views[0].document.title);
	} else {
		alert('popup未打开！');
	}
});

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, {url: url});
	})
}

// 新标签打开某个链接
function openUrlNewTab(url)
{
	chrome.tabs.create({url: url});
}

// omnibox 演示
 

// 当用户接收关键字建议时触发
 

// 预留一个方法给popup调用
function testBackground() {
	alert('你好，我是background！');
}

// 是否显示图片
var showImage;
chrome.storage.sync.get({showImage: true}, function(items) {
	showImage = items.showImage;
});
// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
	// cancel 表示取消本次请求
	// if(!showImage && details.type == 'image') return {cancel: true};
	// // 简单的音视频检测
	// // 大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义
	// if(details.type == 'media') {
	// 	chrome.notifications.create(null, {
	// 		type: 'basic',
	// 		iconUrl: 'img/icon.png',
	// 		title: '检测到音视频',
	// 		message: '音视频地址：' + details.url,
	// 	});
	// }
}, {urls: ["<all_urls>"]}, ["blocking"]);