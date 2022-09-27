import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./type";
import { headers } from "../apis/headers";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post(
    "/b",
    { ...formValues, userId },
    {
      headers: { ...headers, "X-Collection-Id": "631dabd25c146d63ca975168" },
    }
  );

  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  await streams
    .get("/c/631dabd25c146d63ca975168/bins")
    .then(async ({ data }) => {
      const list = data.map(async (item) => {
        const { data } = await streams.get(`/b/${item.record}`);
        return data;
      });
      for (let i = 0; i < list.length; i++) {
        list[i] = await list[i];
        list[i] = { ...list[i].record, id: list[i].metadata.id };
      }
      dispatch({
        type: FETCH_STREAMS,
        payload: list,
      });
    });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/b/${id}`);

  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.put(`/b/${id}`, formValues);

  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });
  history.push("/");
};
