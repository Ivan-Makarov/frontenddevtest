const handBox = document.querySelector('.arrow_box');
const canvas = document.querySelector('#canvas_int');
const ctx = canvas.getContext('2d');
const canvasCenter = {
    x: canvas.getBoundingClientRect().width / 2,
    y: canvas.getBoundingClientRect().height / 2
}
const PI = Math.PI;

console.log(canvasCenter);

document.addEventListener('click', function(e) {
    if (handBox.classList.contains('active')) {
        handBox.classList.remove('active');
        location.reload();
    } else {
        handBox.classList.add('active');
        drawArc(7.8)
    }
});

function drawArc(time) {
    const fps = 60
    const frames = time * fps;

    const fullCircles = 1.25

    let timeout = 0;
    let radius = 222;

    ctx.lineWidth = 24;
    ctx.beginPath();

    let currentSegment = 1;

    for (let i = 0; i < frames * fullCircles; i++) {
        setTimeout(() => {
            const start = (i / frames) * 2 * PI + 1.5 * PI;
            const end = ((i + 1) / frames) * 2 * PI + 1.5 * PI;

            if (start < 2.5 * PI + PI / 6) {
                ctx.strokeStyle = '#9BCAEC';
            }
            if (start > 2.5 * PI + PI / 6 && currentSegment < 2) {
                ctx.strokeStyle = '#3080A9';
                startSegment();
            }
            if (start > 2.5 * PI + PI / 3 && currentSegment < 3) {
                ctx.strokeStyle = '#9BCAEC';
                startSegment();
            }
            if (start > 3 * PI + PI / 6 && currentSegment < 4) {
                ctx.strokeStyle = 'transparent';
                startSegment();
            }
            if (start > 3 * PI + PI / 3 && currentSegment < 5) {
                ctx.strokeStyle = 'midnightblue';
                startSegment();
            }
            if (start > 3.5 * PI && currentSegment < 6) {
                ctx.strokeStyle = '#3080A9'
                radius += 1.2 * ctx.lineWidth;
                startSegment();
            }
            ctx.arc(canvasCenter.x, canvasCenter.y, radius, start, end);
            ctx.stroke();

            function startSegment() {
                currentSegment++;
                ctx.beginPath();
            }
        }, timeout);
        timeout += 1000 / (fps * fullCircles)
    }
}
