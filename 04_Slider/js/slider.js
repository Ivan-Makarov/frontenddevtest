function launchSlider() {
    const slider = document.querySelector('.parentSlider');
    const marker = document.querySelector('.Layer4');
    const valueDisplay = document.querySelector('.textFooter');
    const indicator = document.querySelector('.Peshki');
    const indicatorItems = [...indicator.querySelectorAll('div')].reverse();

    const markerOffset = marker.getBoundingClientRect().width / 2;
    const sliderWidth = slider.getBoundingClientRect().width;

    const indicatorItemMarkerDistance = (sliderWidth - markerOffset) / indicatorItems.length;

    let moved = null;
    let initialMarkerPosition = 0;
    let initialCursorPosition = 0;

    document.addEventListener('mousedown', (e) => {
        if (e.target == marker) {
            moved = event.target;
            initialMarkerPosition = moved.style.left != '' ? parseInt(moved.style.left) : 0;
            initialCursorPosition = e.pageX;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (moved) {
            e.preventDefault();
            let markerPosition = e.pageX - initialCursorPosition + initialMarkerPosition;

            if (markerPosition < 0) {
                markerPosition = 0;
            } else if (markerPosition > sliderWidth - markerOffset) {
                markerPosition = sliderWidth - markerOffset
            }

            moved.style.left = markerPosition + 'px';
            showIndicators(markerPosition);
            showValue(markerPosition);
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (moved) {
            moved = null
        }
    });

    function showIndicators(position) {
        const activeIndicators = Math.floor(position / indicatorItemMarkerDistance);

        indicatorItems.forEach((item, i) => {
            if (i <= activeIndicators - 1) {
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        })
    }

    function showValue(position) {
        const valueUnit = (sliderWidth - markerOffset) / 100;
        const value = parseInt(position / valueUnit);
        valueDisplay.textContent = value > 0 ? value + '%' : value;
    }
}

document.addEventListener('DOMContentLoaded', launchSlider);
