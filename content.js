debugger;
var isElsevier = window.location.toString().includes("www.sciencedirect.com");
var title = document.querySelector("h1").innerText.replace(":", "-").replace("?","").replace("<"|">"|"*"|"\""|"/"|"\\"|"|", "").replace(/(\r\n|\n|\r)/gm, " ");
var urlToDowload = document.querySelector("a[href*='pdf']").href
if (isElsevier)
{
    $("#pdfLink > span > span.pdf-download-label.u-show-inline-from-lg").trigger("click");
    var url = document.querySelector("#popover-content-download-pdf-popover > div > div > a.link-button.u-margin-s-bottom.link-button-primary").href;
    $.get(url, function(data, status)
    {
        var html = $(data);
        var text = html.eq(13);
        html = $(text.text());
        urlToDowload = html.find("a").attr('href');
        chrome.runtime.sendMessage({data: {url: urlToDowload, title: title}});
    });
}
else
{
    chrome.runtime.sendMessage({data: {url: urlToDowload, title: title}})
}
    