document.addEventListener("DOMContentLoaded", function() {
    // 모든 Ace Editor 인스턴스를 찾습니다.
    var editors = document.querySelectorAll('.ace_editor');

    editors.forEach(function(editorElement) {
        var editor = ace.edit(editorElement);
        editor.getSession().setUseWrapMode(true);
    });
});
