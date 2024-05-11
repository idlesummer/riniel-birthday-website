document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    const h1 = document.querySelector('h1');
    const div = document.querySelector('#main-content');
    const divWidth = div.clientWidth;
    const divHeight = div.clientHeight;
    
    images.forEach(function(img) {
        // Randomize position
        const randomX = Math.random() * (divWidth - img.width);
        const randomY = Math.random() * (divHeight - img.height);
        
        // Apply random position
        img.style.left = randomX + 'px';
        img.style.top = randomY + 'px';
    });

    // Change background image on div hover
    h1.addEventListener('mouseenter', function() {
        div.style.backgroundImage = "url('/static/img/background-1.png')";
        console.log(1)
    });

    h1.addEventListener('mouseleave', function() {
        div.style.backgroundImage = "url('/static/img/background-2.jpg')";
    });
});
