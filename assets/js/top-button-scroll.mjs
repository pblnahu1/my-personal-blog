export default function fnBtnScrollTop(selectorID) {
    const btnIrArriba = document.getElementById(selectorID);
    btnIrArriba.onclick = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    window.onscroll = function () { scrollFunction() }
    
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnIrArriba.style.display = "block";
        } else {
            btnIrArriba.style.display = "none";
        }
    }
}
