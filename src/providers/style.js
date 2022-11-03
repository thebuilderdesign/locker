import React from "react";

import { CssBaseline } from "@mui/material";

// ** Declare Style Provider
const MuiStyleProvider = ({ children }) => {
    return (
        <>
            <CssBaseline />
            {children}
        </>
    );
};

export default MuiStyleProvider;