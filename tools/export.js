// Highlighted code export © Vladimir Gubarkov <xonixx@gmail.com>
String.prototype.escape = function() {
    return this.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
};

function ExportDoIt() {
    var export_from = document.getElementById("export_from");
    var export_to = document.getElementById("export_to");
    var export_view = document.getElementById("export_view");
    var selector = document.getElementById("langSelector");
    var selectedLang = selector.options[selector.selectedIndex].value.toLowerCase();
    if (selectedLang) {
        export_view.innerHTML = '<pre><code class="' + selectedLang + '">' + export_from.value.escape() + "</code></pre>";
    } else { // try auto
        export_view.innerHTML = '<pre><code>' + export_from.value.escape() + "</code></pre>";
    }
    hljs.highlightBlock(export_view.firstChild.firstChild);
    export_to.value = export_view.innerHTML;
}

function ExportCopyToBuffer(textToCopy) {
    if (window.clipboardData) { // IE
        window.clipboardData.setData("Text", textToCopy);
    } else if (window.netscape) { // FF
        // from http://developer.mozilla.org/en/docs/Using_the_Clipboard
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
        var gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
        gClipboardHelper.copyString(textToCopy);
    }
}
