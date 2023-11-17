import { NextPage } from "next";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Instructions } from "../components/Instructions";
import { Initialize } from "../components/Initialize";
import { useState } from "react";
import Head from "next/head";

const Home: NextPage = (props) => {
    const [counter, setCounter] = useState("");
    const [transactionUrl, setTransactionUrl] = useState("");
    const wallet = useWallet();

    return (
        <div className="app">
            <Head>
                <title>Anchor Frontend Template</title>
            </Head>

            <div className="app-container">
                <WalletMultiButton />

                {wallet.connected ? (
                    counter ? (
                        <Instructions
                            counter={counter}
                            setTransactionUrl={setTransactionUrl}
                        />
                    ) : (
                        <Initialize
                            setCounter={setCounter}
                            setTransactionUrl={setTransactionUrl}
                        />
                    )
                ) : (
                    <div>Connect Wallet</div>
                )}

                <div className="link-container">
                    {transactionUrl && (
                        <a href={transactionUrl} className="link">
                            View most recent transaction
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
