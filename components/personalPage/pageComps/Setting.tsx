import { useRouter } from "next/router";
import {
    useMeQuery
} from "../../../generated/graphql";
import styles from "./Setting.module.css";

interface Props {}

const Favorite: React.FC<Props> = () => {
  const { data: meQuery, loading } = useMeQuery();
  const router = useRouter();

  const returnJSX = () => {
    if (loading) return <div>Loading...</div>;
    const user = meQuery?.me.account;
    if (!user) {
      router.replace("/login");
      return null;
    }
    return (
      <div className={styles["setting-container"]}>
        <h4>We are still working on this page!</h4>
      </div>
    );
  };

  return (
    <section className={styles.setting} id="setting">
      <h1 className={styles["setting-list-h1"]}>Settings</h1>
      {returnJSX()}
    </section>
  );
};

export default Favorite;
