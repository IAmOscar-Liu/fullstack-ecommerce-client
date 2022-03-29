import { useRouter } from "next/router";
import styles from "./PaginationBtn.module.css";

interface Props {
  pathname: string;
  currentPage: number;
  totalPage: number;
  searchTerm?: string;
}

const PaginationBtn: React.FC<Props> = ({
  pathname,
  currentPage,
  totalPage,
  searchTerm,
}) => {
  const router = useRouter();

  const renderButtons = () => {
    // 1,2,3,4,5 -> group 1
    // 6.7.8.9.10 -> group 2
    // 11,12 -> group 3
    const totalGroups = Math.ceil(totalPage / 5);
    const group = Math.ceil(currentPage / 5);
    const endPage = group === totalGroups ? totalPage : group * 5;
    const startPage = endPage - 4 > 0 ? endPage - 4 : 1;

    return (
      <>
        {1 < startPage && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            <span>...</span>
          </>
        )}
        {Array(endPage - startPage + 1)
          .fill(null)
          .map((_, pI) => {
            const pageIdx = pI + startPage;
            return (
              <button
                key={pageIdx}
                onClick={() => handlePageChange(pageIdx)}
                className={pageIdx === currentPage ? styles["active"] : ""}
              >
                {pageIdx}
              </button>
            );
          })}
        {totalPage > endPage && (
          <>
            <span>...</span>
            <button onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </button>
          </>
        )}
      </>
    );
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPage) return;
    router.push(
      `${pathname}?page=${page}${searchTerm ? "&search=" + searchTerm : ""}`
    );
  };

  return (
    <div className={styles["pg-btns"]}>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        <i className="fas fa-chevron-left"></i>Prev
      </button>
      {renderButtons()}
      <button onClick={() => handlePageChange(currentPage + 1)}>
        Next<i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default PaginationBtn;
