// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19151711-be14d41e7a0bdcd70a93cb54b';

function fetchImage(searchImg, page = 0) {
  const searchParams = new URLSearchParams({
    q: searchImg,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 12,
    key: KEY,
  });

  const url = `${BASE_URL}?${searchParams}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Bad search query :( We have no ${searchImg} images`),
    );
  });
}

const api = { fetchImage };
export default api;
