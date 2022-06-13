document.addEventListener('DOMContentLoaded', () => {
    var btn = document.querySelectorAll('.btn');

    for(var temp of btn) {
        temp.addEventListener('click', ({target}) => {
            var text = target.textContent;
            window.location.href = '/menu/'+text.toLowerCase()
        })
    }
});