import { TOGGLEDARKMODE } from "../../constants";

const Web3 = (
    state = {
        isDarkMode: true
    },
    action
) => {
    switch (action.type) {
        case TOGGLEDARKMODE: {
            localStorage.setItem("isDarkMode", action.payload);
            return { ...state, isDarkMode: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};
export default Web3;
