chrome.browserAction.onClicked.addListener(
    function(tab) {
        chrome.tabs.executeScript(null, { file: "jquery.js" }, function () {
        chrome.tabs.executeScript(null, {file: "content.js"})
        });
    });

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        console.log("url to be downloaded: " + message.data.url);
        console.log("title: " + message.data.title);
        chrome.downloads.download({
            url: message.data.url,
            filename: "papers/" + message.data.title +".pdf",
            conflictAction: "uniquify",
            saveAs: true
        });
        sendResponse();
    }
)