export type SingleNotice = {
  id: string;
  title: string;
  content: string[];
  img: string;
  createdAt: string;
};

export const notices: SingleNotice[] = [
  {
    id: "00001",
    title: "Australia cancels Novak Djokovic' visa to enter country",
    content: [
      `Nine-time Australian Open champion Novak Djokovic may not be able to defend his 2021 title after his visa to enter Australia was canceled following an outcry over his controversial "medical exemption" from the country's coronavirus vaccination rules granted by the competition's organizers`,
      `Djokovic, the men's tennis world no.1 player, hasn't publicly revealed his vaccination status -- but in a news conference on Thursday, Australian Prime Minister Scott Morrison said he "didn't have a valid medical exemption" to the vaccination requirement for all arrivals.`,
      `"Entry with a visa requires double vaccination or a medical exemption," Morrison said. "I am advised that such an exemption was not in place, and as a result, he is subject to the same rules as everyone else."`,
    ],
    img: "https://cdn.cnn.com/cnnnext/dam/assets/220105020746-novak-djokovic-davis-cup-final-12032021-restricted-medium-plus-169.jpg",
    createdAt: "2022/1/6",
  },
  {
    id: "00002",
    title: `Carter warns America 'teeters on the brink of a widening abyss' in stark op-ed ahead of January 6`,
    content: [
      `Former President Jimmy Carter warned Wednesday that democracy is being threatened throughout the country, cautioning that "our great nation now teeters on the brink of a widening abyss."`,
      `Carter, writing in a New York Times op-ed published on the eve of the anniversary of the January 6 insurrection, charged that "without immediate action, we are at genuine risk of civil conflict and losing our precious democracy."`,
      `"Americans," the 97-year-old former President said, "must set aside differences and work together before it is too late."`,
    ],
    img: "https://cdn.cnn.com/cnnnext/dam/assets/220105191200-jimmy-carter-file-2018-exlarge-169.jpg",
    createdAt: "2022/1/6",
  },
  {
    id: "00003",
    title: `Xi'an lockdown brings heartbreak and dysfunction as political pressure to contain outbreak grows`,
    content: [
      `As the locked down Chinese city of Xi'an claimed victory this week in its fight to contain the community spread of Covid-19, harrowing tales of loss and despair have emerged on social media -- highlighting the immense human cost of China's zero-Covid policy.`,
      `The city of 13 million has been under strict lockdown since December 23, as it grapples with the country's worst coronavirus outbreak since Wuhan, the original epicenter of the pandemic. But local authorities have faced a public outcry over perceived incompetence, and disproportionately harsh measures that critics say harm the lives of those they are supposed to protect.`,
      `Over the past two weeks, Chinese social media has been flooded with posts from residents who say they have not received food, basic supplies, even medical care -- painting an image of local government dysfunction as pressure builds on local officials to contain Covid just weeks before major Lunar New Year festivities and the Beijing Winter Olympics.`,
    ],
    img: `https://cdn.cnn.com/cnnnext/dam/assets/220103020935-xian-lockdown-12312021-restricted-medium-plus-169.jpg`,
    createdAt: "2022/1/6",
  },
  {
    id: "00004",
    title: `Emma Watson's pro-Palestinian Instagram post sparks 'anti-Semitism' spat`,
    content: [
      `A pro-Palestinian Instagram post from Hollywood star Emma Watson has sparked accusations of anti-Semitism from Israeli politicians, and a backlash against what many are calling the cynical weaponization of the term to attack supporters of the Palestinian cause.`,
      `On Monday Watson, who shot to global superstardom after playing Hermione Granger in the "Harry Potter" films, posted an image of a pro-Palestinian rally overlaid with the words "Solidarity is a verb," with a quotation from academic Sara Ahmed on the meaning of solidarity in the caption.`,
      `By Wednesday, the post had attracted more than 1.2 million likes, as well as thousands of comments split between those supporting Watson and those criticizing her stance.`,
    ],
    img: `https://cdn.cnn.com/cnnnext/dam/assets/220105100334-emma-watson-palestine-instagram-scli-intl-file-120719-exlarge-169.jpg`,
    createdAt: "2022/1/6",
  },
];
