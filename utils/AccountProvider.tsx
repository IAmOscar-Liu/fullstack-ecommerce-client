import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductBrief } from "../generated/graphql";
import { CartProduct } from "./cartProduct";

type AccountContextType = { account_id: string; carts: CartProduct[] };
interface LocalStorageContextType extends AccountContextType {
  key: string;
  searchTerm: string;
  searchResult: {lcs: string, data: ProductBrief}[];
}

const AccountContextProvider = createContext<{
  accountValue: LocalStorageContextType;
  setAccountValue: Dispatch<SetStateAction<LocalStorageContextType>>;
  setDataFromLocalStorage: (account_id: string) => void;
  deleteDataFromLocalStorage: () => void;
}>({
  accountValue: null,
  setAccountValue: null,
  setDataFromLocalStorage: null,
  deleteDataFromLocalStorage: null,
});

export const useAccount = () => useContext(AccountContextProvider);

const AccountProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [accountValue, setAccountValue] = useState<LocalStorageContextType>({
    key: "",
    account_id: "",
    carts: [],
    searchTerm: "",
    searchResult: [],
  });

  const setDataFromLocalStorage = (account_id: string) => {
    const key =
      process.env.NEXT_PUBLIC_CART_LOCALSTORAGE_KEY + ":" + account_id;
    const jsonValue = window.localStorage.getItem(key);

    // console.log("setDataFromLocalStorage, account_id = ", account_id);
    // console.log("jsonValue:", jsonValue);

    if (jsonValue === null)
      return setAccountValue((prev) => ({
        ...prev,
        key,
        account_id,
        carts: [],
      }));

    try {
      const data = JSON.parse(jsonValue) as AccountContextType;
      setAccountValue((prev) => ({
        ...prev,
        key,
        account_id,
        carts: data.carts || [],
      }));
    } catch (_) {
      setAccountValue((prev) => ({ ...prev, key, account_id, carts: [] }));
    }
  };

  const deleteDataFromLocalStorage = () => {
    window.localStorage.removeItem(accountValue.key);
    setAccountValue((prev) => ({
      ...prev,
      key: "",
      account_id: "",
      carts: [],
    }));
  };

  useEffect(() => {
    if (accountValue.key) {
      // console.log("set localstorage: ", accountValue);
      const { key, account_id, carts } = accountValue;
      window.localStorage.setItem(key, JSON.stringify({ account_id, carts }));
    }
  }, [accountValue]);

  return (
    <AccountContextProvider.Provider
      value={{
        accountValue,
        setAccountValue,
        setDataFromLocalStorage,
        deleteDataFromLocalStorage,
      }}
    >
      {children}
    </AccountContextProvider.Provider>
  );
};

export default AccountProvider;
