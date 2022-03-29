export type SingleQuestion = {
  question: string;
  solutionHtml: string;
};

export const FAQs: SingleQuestion[] = [
  {
    question: `How do I add a new question?`,
    solutionHtml: `
      <div class="faq-solution">
        <p>
          To add a new question go to app settings and press "Manage Questions" button.
        </p>
      </div>
    `,
  },
  {
    question: `Can I insert pictures in my FAQ?`,
    solutionHtml: `
        <div class="faq-solution">
          <p>
            Yes! To add a picture follow these simple steps:
          </p>
          <ul>
            <li>1. Enter App Settings</li>
            <li>2. Click the "Manage Questions" button</li>
            <li>3. Click on the question you would like to attach a picture to</li>
            <li>4. When editing your answer, click on the picture icon and then add an image from your library</li>
          </ul>
        </div>
      `,
  },
  {
    question: `Can I insert a video in my FAQ?`,
    solutionHtml: `
      <div class="faq-solution">
        <p>
          Yes! Users can add video from YouTube or Vimeo with ease:
        </p>
        <ul>
          <li>1. Enter App Settings</li>
          <li>2. Click the "Manage Questions" button</li>
          <li>3. Click on the question you would like to attach a video to</li>
          <li>4. When editing your answer, click on the video icon and then paste the YouTube or Vimeo video URL</li>
          <li>5. That's it! A thumbnail of your video will appear in answer text box</li>
        </ul>
      </div>  
    `,
  },
  {
    question: `How do I edit or remove "FAQ" title?`,
    solutionHtml: `
        <div class="faq-solution">
          <p>
            The FAQ title can be adjusted in the settings tab of the App Settings. You can also remove the title by unchecking its checkbox in the settings tab.
          </p>
        </div
      `,
  },
];
