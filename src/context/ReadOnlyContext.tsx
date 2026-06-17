// contexts/ReadOnlyContext.tsx

import { createContext, useContext, useState } from "react";

type ReadOnlyContextType = {
    readOnly: boolean;
    setReadOnly: (value: boolean) => void;
};

const ReadOnlyContext = createContext<ReadOnlyContextType | null>(null);

export function ReadOnlyProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [readOnly, setReadOnly] = useState(false);

    return (
        <ReadOnlyContext.Provider
            value={{
                readOnly,
                setReadOnly,
            }}
        >
            {children}
        </ReadOnlyContext.Provider>
    );
}

export function useReadOnly() {
    const context = useContext(ReadOnlyContext);

    if (!context) {
        throw new Error("useReadOnly must be used within ReadOnlyProvider");
    }

    return context;
}