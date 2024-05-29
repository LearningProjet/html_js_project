document.addEventListener('DOMContentLoaded', function () {
    let likeCount = 0;
    let commentCount = 0;
    const likeButton = document.querySelector('.like-button');
    const likesList = document.querySelector('.likes-list');
    const commentButton = document.querySelector('.comment-button');
    const commentsList = document.querySelector('.comments-list');

    function increaseLikeCount() {
        likeCount++;
        likeButton.innerHTML = `<i class="fa fa-heart"></i> (${likeCount})`;
    }

    function hideLikesList() {
        likesList.style.display = 'none';
    }

    function toggleComments() {
        if (commentsList.classList.contains('hidden')) {
            commentsList.classList.remove('hidden');
            commentsList.classList.add('visible');
            commentCount = 2;
            commentButton.innerHTML = `<i class="fa fa-comment-o" aria-hidden="true"></i> (${commentCount})`;
        } else {
            commentsList.classList.remove('visible');
            commentsList.classList.add('hidden');
            commentButton.innerHTML = `<i class="fa fa-comment-o" aria-hidden="true"></i>`;
        }
    }

    likeButton.addEventListener('click', increaseLikeCount);
    likeButton.addEventListener('mouseout', hideLikesList);
    commentButton.addEventListener('click', toggleComments);
});
