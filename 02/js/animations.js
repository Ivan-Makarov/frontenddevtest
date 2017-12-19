function activateAnimations() {
    'use strict';

    const $start = $('.js__start');
    const $reset = $('.js__reset');
    const $items = $('.js .item');
    const $item_1 = $('.js .item_1');
    const $item_2 = $('.js .item_2');
    const $item_3 = $('.js .item_3');
    const $item_4 = $('.js .item_4');

    $start.click(animateItems);
    $reset.click(reset);

    function reset() {
        $items.each((i, el) => {
            $(el).css({
                'transform': 'none',
                'transition-duration': '2s'
            })
        })
    }

    function animateItems(e) {
        e.preventDefault();

        opacity($item_1, 5);

        runAnimationSequence($item_2, [
            {
                animation: angle,
                parameters: {
                    to: -45,
                    duration: 2.5
                }
            },
            {
                animation: angle,
                parameters: {
                    to: 45,
                    duration: 2.5
                }
            }
        ])

        runAnimationSequence($item_3, [
            {
                animation: size,
                parameters: {
                    to: 0.5,
                    duration: 2.5
                }
            },
            {
                animation: size,
                parameters: {
                    to: 1.5,
                    duration: 2.5
                }
            }
        ])

        runAnimationSequence($item_4, [
            {
                animation: position,
                parameters: {
                    x: -20,
                    y: -20,
                    duration: 1
                }
            },
            {
                animation: position,
                parameters: {
                    x: 20,
                    y: -20,
                    duration: 1
                }
            },
            {
                animation: position,
                parameters: {
                    x: 20,
                    y: 20,
                    duration: 1
                }
            },
            {
                animation: position,
                parameters: {
                    x: -20,
                    y: 20,
                    duration: 1
                }
            },
            {
                animation: position,
                parameters: {
                    x: 0,
                    y: 0,
                    duration: 1
                }
            }
        ])
    }

    function opacity(item, duration) {
        item.fadeOut(duration * 1000 / 2)
        item.fadeIn(duration * 1000 / 2)
    }

    function angle(item, options) {
        item.css({
            'transition-duration': `${options.duration}s`,
            'transform': `rotate(${options.to}deg)`
        })
    }

    function size(item, options) {
        item.css({
            'transition-duration': `${options.duration}s`,
            'transform': `scale(${options.to})`
        })
    }

    function position(item, options) {
        item.css({
            'transition-duration': `${options.duration}s`,
            'transform': `translate(${options.x}px, ${options.y}px)`
        })
    }

    function runAnimationSequence(item, options) {
        options[0].animation(item, options[0].parameters);
        let durationCounter = 0

        for (let i = 1; i < options.length; i++) {
            durationCounter += options[i - 1].parameters.duration * 1000;
            setTimeout(() => {
                options[i].animation(item, options[i].parameters);
            }, durationCounter);
        }
    }
}

document.addEventListener('DOMContentLoaded', activateAnimations);
