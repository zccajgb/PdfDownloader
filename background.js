chrome.browserAction.onClicked.addListener(
    function(tab) {
        chrome.tabs.executeScript(null, { file: "jquery.js" }, function () {
        chrome.tabs.executeScript(null, {file: "content.js"})
        });
    });

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        console.log(message.data.url)
        chrome.downloads.download({
            url: message.data.url,
            filename: "papers/" + message.data.title +".pdf",
            conflictAction: "uniquify",
            saveAs: true
        });
        sendResponse();
    }
)