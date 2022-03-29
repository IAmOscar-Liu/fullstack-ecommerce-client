import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import ProductsLayout from "../../../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../../../layouts/OverviewLayout";
import styles from "../../../../../../components/overviewPage/pageComps/Notice.module.css";
import {
  notices,
  SingleNotice as MySingleNotice,
} from "../../../../../../dummyData/notice";
import { withApollo } from "../../../../../../utils/withApollo";

interface Props {
  notice: MySingleNotice;
}

const SingleNotice = ({ notice }: Props) => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <div
          className={`${styles["notice-container"]} single-notice-container`}
        >
          <style jsx>{`
            .single-notice-container {
              width: min(100%, 1000px);
              margin-inline: auto;
            }
            .publish-date {
              color: #555;
            }
            .go-back {
              text-decoration: none;
              font-size: 1.3em;
              width: max-content;
              align-self: flex-end;
              margin-top: -29px;
              margin-bottom: 0.8em;
            }
            .go-back i {
              margin-right: 8px;
            }
            .imgBx {
              padding-top: calc(min(100%, 1000px) * 0.5625);
              position: relative;
              margin-bottom: 1em;
            }
            .imgBx img {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              object-fit: cover;
            }
            .paragraphs {
              font-size: 1.2em;
            }
            .paragraphs p + p {
              margin-top: 1em;
            }
            .go-back-bottom {
              text-decoration: none;
              font-size: 1.2em;
              width: max-content;
              margin-top: 0.5em;
            }
            .go-back-bottom i {
              margin-right: 8px;
            }
            .go-back:hover,
            .go-back-bottom:hover {
              text-decoration: underline;
            }
          `}</style>

          <h1 className="notice-title">{notice.title}</h1>

          <span className="publish-date">Published on {notice.createdAt}</span>
          <Link href="/main/more/overview/notice">
            <a className="go-back">
              <i className="fas fa-arrow-left"></i>Go back
            </a>
          </Link>
          <div className="imgBx">
            <img src={notice.img} alt="" />
          </div>

          <div className="paragraphs">
            {notice.content.map((c, i) => (
              <p key={i}>{c}</p>
            ))}
          </div>

          <Link href="/main/more/overview/notice">
            <a className="go-back-bottom">
              <i className="fas fa-arrow-left"></i>Go back
            </a>
          </Link>
        </div>
      </OverviewLayout>
    </ProductsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = notices.map((notice) => ({
    params: { notice_id: notice.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const notice: MySingleNotice = notices.find((n) => n.id === params.notice_id);

  return {
    revalidate: 60 * 30,
    props: {
      notice,
    },
  };
};

// export default SingleNotice;
export default withApollo({ ssr: false })(SingleNotice);
