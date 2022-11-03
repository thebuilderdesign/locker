import React, { useEffect } from "react";

// ** Web3 React
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
// ** Import Material-Ui Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Alert from "@mui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {useDispatch} from 'react-redux';

// ** Import Material Icons
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ReplayIcon from '@mui/icons-material/Replay';

// ** Import Assets
import useStyles from "../assets/styles";
import { Wallets, ConnectedWallet } from "../assets/constants/wallets";

import { injected, walletconnect } from "../assets/constants/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CHANGE_WALLET } from "../redux/constants";

const ConnectWallet = ({ isOpen, setIsOpen }) => {
    const classes = useStyles.base();
    const triedEager = useEagerConnect();
    const { activate, active, account, deactivate, connector, error, setError } =
        useWeb3React();

    const [activatingConnector, setActivatingConnector] = React.useState();
    const cWallet = ConnectedWallet();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type:CHANGE_WALLET,
            payload: account
        })
    }, [account])
    // ** Actions
    const copyAddress = () => {
        alert(`Copied to clipboard.`, "info");
    };
    const viewBlockUrl = (account) => {
        window.open(`https://snowtrace.com/address/${account}`);
    };
    // ** Effects
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    // log the walletconnect URI
    useEffect(() => {
        const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);

    useInactiveListener(!triedEager);

    // ** Actions
    const retryConnect = () => {
        setError(false);
    };
    const onConnectWallet = async (item) => {
        setActivatingConnector(item.connector);
        await activate(item.connector);
    };
    const onDeactiveWallet = () => {
        deactivate();
    };
    const handleCloseWalletList = () => {
        setIsOpen(false);
    };
    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };
    return (
        <Dialog
            onClose={handleCloseWalletList}
            classes={{
                paper: classes.connectWallet,
            }}
            open={isOpen}
            fullWidth={true}
        >
            {error && <Alert severity="error" action={
                <Button color="primary" onClick={() => retryConnect()}>
                    <ReplayIcon />
                </Button>
            }>{getErrorMessage(error)}</Alert>}
            <DialogTitle className="action">
                <Typography>{active && "Account"}</Typography>
            </DialogTitle>
            {active && (
                <Box className={classes.connectWalletButton}>
                    <Button endIcon={<img src={cWallet.logo} alt={cWallet.name} />}>
                        <Typography variant="caption">
                            {`${cWallet.name} Connected`}
                        </Typography>
                    </Button>
                    <TextField
                        inputProps={{
                            readOnly: true,
                        }}
                        value={
                            account
                                ? `${account.substring(
                                    0,
                                    16
                                )} ... ${account.substring(
                                    account.length - 4
                                )}`
                                : "Connect Wallet"
                        }
                    />
                    <ButtonGroup
                        className="buttonGroup"
                        color="primary"
                        aria-label="outlined primary button group"
                    >
                        <CopyToClipboard
                            text={account}
                            onCopy={() => copyAddress()}
                        >
                            <Button
                                onClick={() => copyAddress()}
                                startIcon={<FileCopyOutlinedIcon />}
                            >
                                <Typography variant="caption">Copy</Typography>
                            </Button>
                        </CopyToClipboard>
                        <Button
                            onClick={() => viewBlockUrl(account)}
                            startIcon={<OpenInNewOutlinedIcon />}
                        >
                            <Typography variant="caption">View</Typography>
                        </Button>
                        <Button
                            onClick={() => onDeactiveWallet()}
                            startIcon={<ExitToAppOutlinedIcon />}
                        >
                            <Typography variant="caption">
                                Deactivate
                            </Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
            )}
            {!active ? (
                <List className="wallet-list">
                    {Wallets.map((item, idx) => {
                        const activating =
                            item.connector === activatingConnector;
                        const connected = item.connector === connector;
                        const disabled =
                            !triedEager ||
                            !!activatingConnector ||
                            connected ||
                            !!error;
                        return (
                            <ListItem
                                button
                                key={idx}
                                className="item"
                                disabled={disabled}
                                onClick={() => onConnectWallet(item)}
                            >
                                <ListItemIcon className="symbol">
                                    {activating ? (
                                        <CircularProgress />
                                    ) : (
                                        <img src={item.logo} alt={item.logo} />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        activating
                                            ? "Initializing..."
                                            : item.description
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                ""
            )}
        </Dialog>
    );
};

export default ConnectWallet;
