'use strict';

let movedGift = null;
let shiftX = 0;
let shiftY = 0;
let movedGiftInitialCoord = {};

let giftsLeft = [...document.querySelectorAll('.gift')].length;

const bagFront = document.querySelector('.img1');
bagFront.style.zIndex = '100';

document.addEventListener('mousedown', event => {
    if (event.target.classList.contains('gift')) {
        movedGift = event.target;
        movedGift.style.zIndex = '10'
        const bounds = event.target.getBoundingClientRect();
        shiftX = event.pageX - bounds.left - window.pageXOffset;
        shiftY = event.pageY - bounds.top - window.pageYOffset;
        movedGiftInitialCoord = {
            left: bounds.left,
            top: bounds.top
        }
        movedGift.style.transitionDuration = 'initial';
    }
});

document.addEventListener('mousemove', (e) => {
    if (movedGift) {
        e.preventDefault();
        movedGift.style.left = event.pageX - shiftX + 'px';
        movedGift.style.top = event.pageY - shiftY + 'px';
    }
});

document.addEventListener('mouseup', (e) => {
    if (movedGift) {
        e.preventDefault();
        if (isInside(movedGift.getBoundingClientRect(), bagFront.getBoundingClientRect(), {left: 100, right: 50, top: 0, bottom: 200})) {
            eatGift()
        } else {
            returnGiftToInitial();
        }
    }

    function returnGiftToInitial() {
        movedGift.style.transitionDuration = '0.5s';
        movedGift.style.left = `${movedGiftInitialCoord.left}px`;
        movedGift.style.top = `${movedGiftInitialCoord.top}px`;
        movedGift.style.zIndex = '1';
        movedGift = null;
    }

    function eatGift() {
        movedGift.style.transform = 'translateY(400px)';
        movedGift.style.transitionDuration = '2s';
        movedGift = null;
        giftsLeft--;

        if (giftsLeft == 0) {
            doSthWhenGiftsAreGone()
        }
    }
});

function isInside(square1, square2, crop = {left: 0, right: 0, top: 0, bottom: 0}) {
    return (square1.left > (square2.left + crop.left) && square1.right < (square2.right - crop.right)) && (square1.bottom > (square2.top + crop.top) && square1.top < (square2.bottom - crop.bottom))
}

function doSthWhenGiftsAreGone() {
    const bg = document.querySelector('.bg');
    const img7 = document.querySelector('.img7');
    const $img8 = $('.img8');

    bg.style.backgroundImage = 'url(../images/bg11.jpg)';
    img7.style.transition = '2s';
    img7.style.left = '0';
    $img8.fadeIn(2000)
}
