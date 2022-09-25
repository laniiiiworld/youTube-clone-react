export default class Youtube {
  BASE_URL = 'https://www.googleapis.com/youtube/v3';
  constructor(key) {
    this.key = key;
  }
  search = async (keyword) => {
    const url = `${this.BASE_URL}/search?key=${this.key}&type=video&videoSyndicated=true&part=snippet&maxResults=5&q=${keyword}`;
    return getAPIData(url);
  };

  videos = async (videoId) => {
    const url = `${this.BASE_URL}/videos?key=${this.key}&id=${videoId}&part=snippet`;
    return getAPIData(url);
  };
}

const getAPIData = async (url) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    let response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log('get API datas error 1');
    }
    return response.json();
  } catch (error) {
    console.log('get API datas error 2');
  }
};
