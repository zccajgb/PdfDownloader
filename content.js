var title = document.querySelector("h1").innerText.replace(":", "-").replace("?","").replace("<"|">"|"*"|"\""|"/"|"\\"|"|", "").replace(/(\r\n|\n|\r)/gm, " ");
var elToDownload = document.querySelector("a[href*='.pdf']");
var isElsevier = window.location.toString().includes("www.sciencedirect.com");
if (!elToDownload || isElsevier)
{
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
    var isScienceMag = window.location.toString().includes("sciencemag.org");
    if (isScienceMag)
    {
        $("a[href*='pdf']").trigger('click');
        var urlToDowload = document.querySelector("a[href*='.pdf']").href
        chrome.runtime.sendMessage({data: {url: urlToDowload, title: title}})
    }
    var isTandF = window.location.toString().includes("www.tandfonline.com");
    if (isTandF)
    {
        // var url = window.location.pathname;
        // url = url.replace("/doi", "/doi/pdf");
        // var base_url = window.location.origin;
        // var urlToDowload = base_url + url + "needAccess=true";
        urlToDowload = window.location.toString().replace("full", "pdf");
        title = document.querySelector("h1[class*='title']").innerText.replace(":", "-").replace("?","").replace("<"|">"|"*"|"\""|"/"|"\\"|"|", "").replace(/(\r\n|\n|\r)/gm, " ").trim();
            // "/doi/pdf/10.1080/00032719.2019.1700269?needAccess=true"
        chrome.runtime.sendMessage({data: {url: urlToDowload, title: title}});
    }
}
else
{
    var urlToDowload = elToDownload.href;
    chrome.runtime.sendMessage({data: {url: urlToDowload, title: title}})
}
    