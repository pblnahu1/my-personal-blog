var defaults = {
    spread: 650,
    ticks: 200,
    gravity: 0,
    decay: 0.95,
    startVelocity: 25,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
};

function shoot() {
    confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
    });

    confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
    });
}

document.getElementById("action-btn-magico").addEventListener("click", function () {
    shoot()
    // setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
});
