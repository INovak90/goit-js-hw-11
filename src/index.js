import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import renderImageCard from './markup';
import refs from './refs';
import NewsApiService from './service';

const { searchForm, gallery, loadMore } = refs;
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onClickLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();
  hideLoadMore();
  const text = e.target.elements.searchQuery.value;
  clearGalleryContainer();
  newsApiService.resetPage();
  newsApiService.query = text;
  const promise = await newsApiService.fetchArticles();
  const { totalHits, hits } = promise.data;
  if (text === '' || hits.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  try {
    Notiflix.Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    renderImageCard(hits);
    var lightbox = new SimpleLightbox('.gallery a', {
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    showLoadMore();
  } catch {
    console.log(Error);
  }
  Notiflix.Loading.remove();
}
async function onClickLoadMore() {
  try {
    const promise = await newsApiService.fetchArticles();
    const { totalHits, hits } = promise.data;

    if (gallery.children.length === totalHits) {
      hideLoadMore();
      return Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    Notiflix.Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    renderImageCard(hits);
    if (hits.length === 0) {
      hideLoadMore();
    }
    var lightbox = new SimpleLightbox('.gallery a', {
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
    lightbox.refresh();
  } catch {
    console.log(Error);
  }
  Notiflix.Loading.remove();
}
function clearGalleryContainer() {
  gallery.innerHTML = '';
}
function hideLoadMore() {
  loadMore.classList.add('is-hidden');
}
function showLoadMore() {
  loadMore.classList.remove('is-hidden');
}

