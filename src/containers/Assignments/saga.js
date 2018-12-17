import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

const ASSIGNMENTS_URL = 'https://api.edmodo.com/assignments?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1NDUwNDg5NDksImlzcyI6Imh0dHBzOi8vYXBpLmVkbW9kby5jb20iLCJ1c2VyIjp7ImlkIjoxNDQ1MTU3NTJ9LCJhcHAiOnsiaWQiOjk4OX0sImV4cGlyZXNfaW4iOjg2NDAwLCJzY29wZXMiOiJhbGwifQ.8jM1A5pijWwg9hjpbseSKNUA0IJhbO16Vo8vGq1LpP4h5HWWZzk6GRhusRQWnUlTXRTF8-LXkE8vr6-ljwRJIg';

function* fetchAssignments({ page = 1 }) {
  try {
    const response = yield call(axios.get, `${ASSIGNMENTS_URL}&page=${page}&per_page=5`);
    yield put({
      type: "FETCH_ASSIGNMENTS_SUCCEEDED",
      assignments: response.data,
      total: response.headers['x-total-count'],
    });
  } catch (e) {
    yield put({ type: "FETCH_ASSIGNMENTS_FAILED", message: e.message });
  }
}

export default function* mySaga() {
  yield takeLatest("FETCH_ASSIGNMENTS", fetchAssignments);
}