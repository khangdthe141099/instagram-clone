export const reportList = [
  {
    id: 1,
    key: "spam",
    label: "It's spam",
    content: "spam",
  },
  {
    id: 2,
    key: "nude",
    label: "Nudity or sexual activity",
    content: "nudity or sexual activity",
  },
  {
    id: 3,
    key: "speech",
    label: "Hate speech or symbols",
    content: "hate speech or symbols",
  },
  {
    id: 4,
    key: "violence",
    label: "Violence or dangerous organizations",
    content: "violence or dangerous organizations",
  },
  {
    id: 5,
    key: "illegal",
    label: "Sale of illegal or regulated goods",
    content: "sale of illegal or regulated goods",
  },
  {
    id: 6,
    key: "bullying",
    label: "Bullying or harassment",
    content: "bullying or harassment",
  },
  {
    id: 7,
    key: "eating",
    label: "Eating disorders",
    content: "eating disorders",
  },
  {
    id: 8,
    key: "scam",
    label: "Scam or fraud",
    content: "scam or fraud",
  },
  {
    id: 9,
    key: "information",
    label: "False information",
    content: "false information",
  },
  {
    id: 10,
    key: "hate",
    label: `I just don't like it`,
    content: `you don't like`,
  },
];

export const getReportSuccessList = (username: string) => {
  return [
    {
      id: 1,
      key: 'block',
      label: `Block ${username}`,
      error: true
    },
    {
      id: 2,
      key: 'unfollow',
      label: `Unfollow ${username}`,
      error: false
    },
  ]
}
