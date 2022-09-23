const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyDKQDoYv-HiRcvnKnOoQty29qAInSov_vA';

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

export async function getSearchData(keyword) {
  const url = `${BASE_URL}/search?key=${API_KEY}&type=video&videoSyndicated=true&part=snippet&maxResults=5&q=${keyword}`;
  try {
    let response = await fetch(url, requestOptions);
    if (!response.ok) {
      // throw new Exception('검색 결과를 가져올 수 없습니다.');
      console.log('getSearchData error! api.js 1');
    }
    return response.json();
  } catch (error) {
    // throw new Exception(error);
    console.log('getSearchData error! api.js 2');
  }
}

export async function getVideoData(videoId) {
  const url = `${BASE_URL}/videos?key=${API_KEY}&id=${videoId}&part=snippet`;
  try {
    let response = await fetch(url, requestOptions);
    if (!response.ok) {
      // throw new Exception('검색 결과를 가져올 수 없습니다.');
      console.log('getVideoData error! api.js 1');
    }
    return response.json();
  } catch (error) {
    // throw new Exception(error);
    console.log('getVideoData error! api.js 2');
  }
}
