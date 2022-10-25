import axios from 'axios';

//https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '29780910-989eab2d4bf0da575fbd77284';

export async function fetchImagesWithQuery(query, page) {
  const BASE_PARAMS = {
    q: query,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: page,
  };

  try {
    const response = await axios.get(API_URL, { params: BASE_PARAMS });
    // console.log('response.data.totalHits', response.data.totalHits);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
