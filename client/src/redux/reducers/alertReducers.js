import { ALERT_SET, ALERT_REMOVE, ALERT_RESET } from '../actions/types';

export const alertManagerReducer = (state = { alerts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    /*
      payload = {
        id: '5bd...4bd',
        msg: 'I'm an error :)',
        alertType: 'danger/info/success'
      };
     */
    case ALERT_SET:
      return {
        alerts:
          state.alerts.filter((alert) => alert.msg === payload.msg).length > 0
            ? [...state.alerts]
            : [...state.alerts, payload],
      };
    // payload = { id: '5bd...4d8' }
    case ALERT_REMOVE:
      return {
        alerts: state.alerts.filter((alert) => alert.id !== payload),
      };
    case ALERT_RESET:
      return {
        alerts: [],
      };
    default:
      return state;
  }
};
