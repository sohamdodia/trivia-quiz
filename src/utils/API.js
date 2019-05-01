import Axios from 'axios';

const baseURL = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

export const get = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Axios.get(baseURL); 
      resolve(result.data.results);
    } catch (error) {
      reject(error);
    }
  });
}