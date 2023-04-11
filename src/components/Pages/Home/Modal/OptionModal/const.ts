export const optionKey = {
    REPORT: 'report',
    UNFOLLOW: 'unfollow',
    GO_TO_POST: 'gotopost',
    COPY_LINK: 'copylink',
    ABOUT_THIS_ACCOUNT: 'aboutthisaccount',
    CANCEL: 'cancel'
}

export const options = [
    {
        id: 1,
        key: optionKey.REPORT,
        name: 'Report',
        link: '/',
        warning: true,
    },
    {
        id: 2,
        key: optionKey.UNFOLLOW,
        name: 'Unfollow',
        link: '/',
        warning: true,
    },
    {
        id: 3,
        key: optionKey.GO_TO_POST,
        name: 'Go to post',
        link: '/',
        warning: false,
    },
    {
        id: 4,
        key: optionKey.COPY_LINK,
        name: 'Copy link',
        link: '/',
        warning: false,
    },
    {
        id: 5,
        key: optionKey.ABOUT_THIS_ACCOUNT,
        name: 'About this account',
        link: '/',
        warning: false,
    },
    {
        id: 6,
        key: optionKey.CANCEL,
        name: 'Cancel',
        link: '/',
        warning: false,
    },
]