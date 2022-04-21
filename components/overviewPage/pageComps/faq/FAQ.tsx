/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./FAQ.module.css";
import { FAQs } from "../../../../dummyData/FAQ";
import { HTMLAttributes, useEffect } from "react";
import { useDebounce } from "../../../../utils/useDebounce";

interface Props {}

// const debounce = (fn: () => void, ms: number) => {
//   let timer: any;
//   return () => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = null;
//       fn();
//     }, ms);
//   };
// };

const FAQ: React.FC<Props> = () => {
  // const debounce = useCallback(useDebounce, []);

  useEffect(() => {
    const getFaqSolutionHeight = useDebounce(() => {
      document
        .getElementById("question-container")
        .querySelectorAll("article > div")
        .forEach((el) => {
          // console.log(el);
          const { height } = el
            .querySelector(".faq-solution")
            .getBoundingClientRect();
          // console.log(height);

          el.setAttribute("style", `--el-height: ${height}px;`);
        });
    }, 500);

    getFaqSolutionHeight();
    window.addEventListener("resize", getFaqSolutionHeight);

    return () => window.removeEventListener("resize", getFaqSolutionHeight);
  }, []);

  return (
    <section className={styles.faq}>
      <h1 className={styles["faq-list-h1"]}>Frequently Asked Questions</h1>

      <div id="question-container" className={styles["question-container"]}>
        {FAQs.map((f, i) => (
          <article key={i}>
            <input type="checkbox" id={`faq-${i + 1}-checkbox`} />
            <label htmlFor={`faq-${i + 1}-checkbox`}>
              <span>{f.question}</span>
              <b></b>
            </label>
            <div
              style={
                { "--el-height": "auto" } as HTMLAttributes<HTMLDivElement>
              }
              className={styles["solution-section"]}
              dangerouslySetInnerHTML={{ __html: f.solutionHtml }}
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
