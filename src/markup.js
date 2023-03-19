export default function renderImageCard(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class="photo-card__link" href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes<span><span class="info-value">${likes}</span></span></b>
    </p>
    <p class="info-item">
      <b>Views<span class="info-value">${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments<span class="info-value">${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads<span class="info-value">${downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
