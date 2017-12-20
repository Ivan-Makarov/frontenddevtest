function initIntersect() {
    const people = [...document.querySelectorAll('.map li')];
    const yellow = document.querySelector('.drag_yellow');
    const red = document.querySelector('.drag_red');
    const dragArea = document.querySelector('.drag_red_wrapper');

    let moved = null;
    let initialdragPosition = 0;
    let initialCursorPosition = 0;

    const staticBounds = yellow.getBoundingClientRect();
    const dragAreaHeight = dragArea.getBoundingClientRect().height

    document.addEventListener('mousedown', (e) => {
        if (e.target == red) {
            moved = event.target;
            initialDragPosition = moved.style.top != '' ? parseInt(moved.style.top) : 0;
            initialCursorPosition = e.pageY;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (moved) {
            e.preventDefault();
            let dragPosition = e.pageY - initialCursorPosition + initialDragPosition;

            if (dragPosition < 0) {
                dragPosition = 0;
            } else if (dragPosition > dragAreaHeight) {
                dragPosition = dragAreaHeight
            }

            moved.style.top = dragPosition + 'px';

            higlightPeople(moved)

            function higlightPeople(drag) {
                const dragBounds = drag.getBoundingClientRect();
                const intersection = getIntersection(dragBounds, staticBounds)
                people.forEach(person => {
                    if (isIntersect(person.getBoundingClientRect(), intersection)) {
                        person.style.backgroundImage = 'url(/images/refract/man_red.png)';
                    } else {
                        person.style.backgroundImage = 'url(/images/refract/man_white.png)';
                    }
                })
            }

            function getIntersection(bounds1, bounds2) {
                if (isIntersect(bounds1, bounds2)) {
                    const intersection = {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                    intersection.top = bounds1.top >= bounds2.top ? bounds1.top : bounds2.top;
                    intersection.bottom = bounds1.bottom <= bounds2.bottom ? bounds1.bottom : bounds2.bottom;
                    intersection.left = bounds1.left >= bounds2.left ? bounds1.left : bounds2.left;
                    intersection.right = bounds1.right <= bounds2.right ? bounds1.right : bounds2.right;
                    return intersection
                } else {
                    return null
                }
            }

            function isIntersect(bounds1, bounds2) {
                return bounds1.right > bounds2.left && bounds1.left < bounds2.right && bounds1.bottom > bounds2.top && bounds1.top < bounds2.bottom
            }
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (moved) {
            moved = null
        }
    });
}

document.addEventListener('DOMContentLoaded', initIntersect);
