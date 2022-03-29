import styles from "./Notice.module.css";
import { notices } from "../../../dummyData/notice";
import { useRouter } from "next/router";

interface Props {}

const Notice: React.FC<Props> = () => {
  const router = useRouter();

  const handleClick = (notice_id: string) => {
    router.push(`/main/more/overview/notice/single_notice/${notice_id}`);
  };

  return (
    <div className={styles["notice-container"]}>
      <h1>Notice</h1>

      <div className={styles.notices}>
        {notices.map((notice) => (
          <article key={notice.id}>
            <div className={styles["imgs"]}>
              <div
                onClick={() => handleClick(notice.id)}
                className={styles["imgBx"]}
              >
                <img src={notice.img} alt="" />
              </div>
            </div>

            <div className={styles["des"]}>
              <h2 onClick={() => handleClick(notice.id)}>{notice.title}</h2>
              <p>{notice.content[0]}</p>
              <span>{notice.createdAt}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Notice;
