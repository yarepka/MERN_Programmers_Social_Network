import { v4 as uuid } from 'uuid';
import { ALERT_SET, ALERT_REMOVE, ALERT_RESET } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => {
  return (dispatch) => {
    const id = uuid();
    dispatch({
      type: ALERT_SET,
      payload: {
        id: id,
        msg: msg,
        alertType: alertType,
      },
    });

    setTimeout(() => {
      dispatch({
        type: ALERT_REMOVE,
        payload: id,
      });
    }, timeout);
  };
};

export const resetAlert = () => {
  return (dispatch) => {
    dispatch({
      type: ALERT_RESET,
    });
  };
};
