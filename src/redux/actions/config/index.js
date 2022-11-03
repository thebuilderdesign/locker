import { TOGGLEDARKMODE } from "../../constants";

export const theme_mode_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: TOGGLEDARKMODE,
            payload: params,
        });
};
