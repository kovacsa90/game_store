import React, { createContext, useContext } from "react";

interface Currency {
  currency: "USD" | "EUR" | "GBP";
  setCurrency: (value: "USD" | "EUR" | "GBP") => void;
  rate: number;
}

type CurrencyProps = {
  context: Currency;
  children: React.ReactNode;
};

const CurencyContext = createContext({} as Currency);

const CurrencyProvider: React.FC<CurrencyProps> = ({
  context,
  children,
}: CurrencyProps) => {
  return (
    <CurencyContext.Provider value={context}>
      {children}
    </CurencyContext.Provider>
  );
};

const useCurrency = (): Currency => {
  const { currency, setCurrency, rate } = useContext(CurencyContext);
  if (
    setCurrency === undefined ||
    currency === undefined ||
    rate === undefined
  ) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return { currency, setCurrency, rate };
};

export { CurrencyProvider, useCurrency };
