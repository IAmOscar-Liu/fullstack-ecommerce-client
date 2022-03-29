import debounce from "lodash/debounce";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ProductBrief,
  useGetAllProductsQuery,
  useMeQuery,
} from "../../../generated/graphql";
import { useAccount } from "../../../utils/AccountProvider";
import { isServer } from "../../../utils/isServer";
import { LCS } from "../../../utils/LCS";
import styles from "./Header.module.css";

interface Props {
  sidebarOpen: boolean;
  toggleSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ sidebarOpen, toggleSidebarOpen }) => {
  const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearchResult, toggleShowSearchResult] = useState<Boolean>(false);
  const { data } = useMeQuery({ skip: isServer() });
  const { data: allProductQuery } = useGetAllProductsQuery({
    skip: isServer() || !showSearchResult,
    variables: { limit: 100000 },
  });
  const { accountValue, setAccountValue } = useAccount();
  const { searchTerm, searchResult, carts } = accountValue;
  const searchbarRef = useRef<HTMLInputElement>(null);
  const resultListRef = useRef<HTMLDivElement>(null);

  const filterSearchResult = (
    products: ProductBrief[],
    term: string,
    maxResult: number = 20
  ) => {
    if (term.length === 0 || products.length === 0) return [];

    const results: { lcs: string; data: ProductBrief }[] = [];
    results.push(
      ...products
        .filter((p) => p.name.toLowerCase().includes(term.toLowerCase()))
        .map((p) => ({ lcs: term, data: p }))
    );

    const newTerm = term.replaceAll(" ", "").toLowerCase();

    if (results.length < maxResult) {
      const LCSResults = products
        .filter((p) => !results.find((r) => r.data.name === p.name))
        .filter(
          (p) => newTerm.length >= 3 && p.name.replaceAll(" ", "").length >= 3
        )
        .map((p) => ({
          lcs: LCS(newTerm, p.name.replaceAll(" ", "").toLowerCase()),
          data: p,
        }))
        .sort((a, b) => b.lcs.length - a.lcs.length)
        .filter((p) => p.lcs.length >= Math.max(3, term.length - 1));

      results.push(...LCSResults.slice(0, maxResult - results.length));
    }

    return results;
  };

  const highlightSearchResult = (name: string, lcs: string) => {
    const nameChars = name.split("").map((ch) => ({ ch, highlight: false }));

    if (name.toLowerCase().includes(lcs.toLowerCase())) {
      const beginAt = name.toLowerCase().indexOf(lcs.toLowerCase());
      const endAt = beginAt + lcs.length;
      for (let nameIdx = beginAt; nameIdx < endAt; nameIdx++) {
        nameChars[nameIdx].highlight = true;
      }
    } else {
      const termChar = lcs.split("");
      let nameIdx = 0;

      while (termChar.length > 0 && nameIdx < name.length) {
        if (nameChars[nameIdx].ch.toLowerCase() === termChar[0].toLowerCase()) {
          termChar.shift();
          nameChars[nameIdx].highlight = true;
        }
        nameIdx++;
      }
    }

    return nameChars.map((nch, nchIdx) => (
      <b key={nchIdx} className={nch.highlight ? styles["highlight"] : ""}>
        {nch.ch}
      </b>
    ));
  };

  const getSearchResult = useCallback(
    debounce((term: string) => {
      // console.log("search term: ", term);
      setAccountValue((prev) => ({
        ...prev,
        searchResult: filterSearchResult(
          allProductQuery?.getAllProducts.products ?? [],
          term
        ),
      }));
    }, 500),
    [allProductQuery]
  );

  const handleSearchTermChange = (term: string) => {
    // setSearchTerm(term);
    setAccountValue((prev) => ({ ...prev, searchTerm: term }));
    getSearchResult(term);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const elTarget = e.target as HTMLElement;
      if (
        resultListRef.current == null ||
        searchbarRef.current == null ||
        resultListRef.current.contains(elTarget) ||
        searchbarRef.current.contains(elTarget)
      )
        return;
      toggleShowSearchResult(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={styles["product-header"]}>
      <h1 className={styles["header-h1"]}>
        <Link href="/">
          <a>
            <i className={`${styles.fas} fas fa-pepper-hot`}></i>
            Banana
          </a>
        </Link>
      </h1>
      <div className={`${styles["search-area"]} spacer-2`}>
        <input
          id="search-checkbox"
          type="checkbox"
          checked={sidebarOpen}
          onChange={() => toggleSidebarOpen((p) => !p)}
        />
        <i
          className={`${styles.fas} fas ${
            sidebarOpen
              ? styles["fa-times"] + " fa-times"
              : styles["fa-bars"] + " fa-bars"
          }`}
        ></i>
        <label className={styles["search-box"]}>
          <i className={`${styles.fas} fas fa-search`}></i>
          <input
            ref={searchbarRef}
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            onFocus={() => toggleShowSearchResult(true)}
          />
        </label>

        <div
          className={`${styles["result-list"]} ${
            showSearchResult ? styles["show"] : ""
          }`}
          ref={resultListRef}
        >
          <ul>
            {searchResult.length === 0 && searchTerm && (
              <li>
                <i className="fas fa-search"></i>
                <span>No result for "{searchTerm}"</span>
              </li>
            )}
            {searchResult.length > 0 &&
              searchResult.slice(0, 5).map((p, pIdx) => (
                <li
                  key={pIdx}
                  onClick={() => {
                    router.push(`/main/products/singleProduct/${p.data.id}`);
                    toggleShowSearchResult(false);
                  }}
                >
                  <img src={p.data.img_url.split("<br/>")[0]} alt="" />
                  <span>{highlightSearchResult(p.data.name, p.lcs)}</span>
                </li>
              ))}
            {searchResult.length > 0 && (
              <li
                className={styles["view-all"]}
                onClick={() => {
                  router.push(`/main/products/search?search=${searchTerm}`);
                  toggleShowSearchResult(false);
                }}
              >
                <i className="fas fa-globe"></i>
                <span>View all {searchResult.length} results on new page</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="spacer-1"></div>
      <div className={styles["user-panel"]}>
        <span onClick={() => router.push("/main/personal/cart")}>
          {data?.me.access_token && (
            <b className={styles["show"]}>{carts.length}</b>
          )}
          <i
            className={`fas fa-shopping-cart ${styles.fas} ${styles["fa-shopping-cart"]}`}
          ></i>
        </span>
        <span>
          <i className={`fas fa-cog ${styles.fas}`}></i>
        </span>
        <button
          onClick={() =>
            router.push(data?.me ? "/main/personal/profile" : "/login")
          }
        >
          <img
            src={
              data?.me.account?.img_url
                ? data.me.account.img_url
                : "/images/default_user.png"
            }
            alt=""
          />
          <span>{data?.me.account?.name ? data.me.account.name : "Login"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
