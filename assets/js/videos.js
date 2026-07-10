const modal = new bootstrap.Modal(document.getElementById('videoModal'));
const video = document.getElementById('modalVideo');

document.querySelectorAll('.video-card').forEach(card => {

    card.addEventListener('click', () => {

        const src = card.dataset.video;

        video.src = src;
        modal.show();

        video.load();

        video.onloadeddata = () => {
            video.play();
        };

    });

});

document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {

    video.pause();
    video.currentTime = 0;
    video.removeAttribute('src');
    video.load();

});