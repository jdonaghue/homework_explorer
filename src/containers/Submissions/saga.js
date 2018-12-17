import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

const SUBMISSIONS_URL = 'https://api.edmodo.com/assignment_submissions?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1NDUwNDg5NDksImlzcyI6Imh0dHBzOi8vYXBpLmVkbW9kby5jb20iLCJ1c2VyIjp7ImlkIjoxNDQ1MTU3NTJ9LCJhcHAiOnsiaWQiOjk4OX0sImV4cGlyZXNfaW4iOjg2NDAwLCJzY29wZXMiOiJhbGwifQ.8jM1A5pijWwg9hjpbseSKNUA0IJhbO16Vo8vGq1LpP4h5HWWZzk6GRhusRQWnUlTXRTF8-LXkE8vr6-ljwRJIg';

function* fetchSubmissions({ assignmentId }) {
  try {
    const response = yield call(axios.get, `${SUBMISSIONS_URL}&assignment_id=${assignmentId}`);
    yield put({
      type: "FETCH_SUBMISSIONS_SUCCEEDED",
      submissions: response.data,
    });
  } catch (e) {
    yield put({ type: "FETCH_SUBMISSIONS_FAILED", message: e.message });
  }
}

export default function* mySaga() {
  yield takeLatest("FETCH_SUBMISSIONS", fetchSubmissions);
}
