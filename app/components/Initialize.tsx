import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { FC, useEffect, useState } from "react";
import idl from "../idl.json";

export interface Props {
    setCounter;
    setTransactionUrl;
}

export const Initialize: FC<Props> = ({ setCounter, setTransactionUrl }) => {
    const [program, setProgram] = useState<anchor.Program>();

    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    useEffect(() => {
        let provider: anchor.Provider;

        try {
            provider = anchor.getProvider();
        } catch {
            provider = new anchor.AnchorProvider(connection, wallet, {});
            anchor.setProvider(provider);
        }

        const program = new anchor.Program(
            idl as anchor.Idl,
            idl.metadata.address
        );
        setProgram(program);
    }, []);

    const onClick = async () => {
        try {
            const newAccount = anchor.web3.Keypair.generate();
            const userPublicKey = wallet.publicKey;

            // Calling the initialize function
            let tx = await program.methods
                .initialize(new anchor.BN(0))
                .accounts({
                    myAccount: newAccount.publicKey,
                    user: userPublicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .signers([newAccount])
                .rpc();

            // After the transaction is confirmed, you can get the signature and update the UI
            let url = `https://explorer.solana.com/tx/${tx}?cluster=devnet`;

            setCounter(newAccount.publicKey);
            setTransactionUrl(url);
        } catch (err) {
            console.error("Error calling initialize function:", err);
        }
    };

    return (
        <button onClick={onClick} className="button">
            Initialize Counter
        </button>
    );
};
