/**
 * Main JS File
 */
document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
            let config = JSON.parse(
                swiperElement.querySelector(".swiper-config").innerHTML.trim()
            );
            new Swiper(swiperElement, config);
        });
    }

    window.addEventListener("load", initSwiper);
});
