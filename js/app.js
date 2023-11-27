//Скрол
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        try {
            var target = document.querySelector(this.getAttribute('href'));
        }
        catch{
            return;
        }
        var targetPosition = window.scrollY + target.getBoundingClientRect().top;
        if (Math.abs(window.scrollY - targetPosition) > 1) {
            e.preventDefault();
            var startPosition = window.scrollY;
            var distance = targetPosition - startPosition;
            var startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                var timeElapsed = currentTime - startTime;
                var run = ease(timeElapsed, startPosition, distance, 2000);
                window.scrollTo(0, run);
                if (timeElapsed < 2000) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

//Слайдер
let sliderState = 2;
document.querySelector('a#switch').addEventListener('click', function(e) {
    e.preventDefault();
    var sliders = document.querySelectorAll('.slide');
    sliders.forEach(s => {
        s.classList.remove('s1');
        s.classList.remove('s2');
        s.classList.remove('s3');
    });
    switch (sliderState) {
        case 0: {
            sliders[0].classList.add('s1');
            sliders[1].classList.add('s2');
            sliders[2].classList.add('s3');
            sliderState = 2;
            break;
        }
        case 1: {
            sliders[0].classList.add('s2');
            sliders[1].classList.add('s3');
            sliders[2].classList.add('s1');
            sliderState = 0;
            break;
        }
        case 2: {
            sliders[0].classList.add('s3');
            sliders[1].classList.add('s1');
            sliders[2].classList.add('s2');
            sliderState = 1;
            break;
        }
    }
})