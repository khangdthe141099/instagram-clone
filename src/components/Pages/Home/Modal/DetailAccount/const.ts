export const getOptionList = (
  dateJoined?: any,
  basedIn?: string,
  verifiedDate?: any
) => {
  return [
    {
      id: 1,
      key: "dateJoined",
      backgroundImg: `url("/images/post/dateJoin-icon.png")`,
      label: "Date Joined",
      data: dateJoined,
    },
    {
      id: 2,
      key: "accountBasedIn",
      backgroundImg: `url("/images/post/basedIn-icon.png")`,
      label: "Account based in",
      data: basedIn,
    },
    {
      id: 3,
      key: "verified",
      backgroundImg: `url("/images/post/verifiedDate-icon.png")`,
      label: "Verified",
      data: verifiedDate || "Not verified",
    },
  ];
};
