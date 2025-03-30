// 图片轮播
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active"); // 移除当前激活的幻灯片
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].classList.add("active"); // 激活下一张幻灯片
    setTimeout(showSlides, 3000); // 每3秒切换一次图片
}