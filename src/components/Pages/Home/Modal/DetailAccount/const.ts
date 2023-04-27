export const getOptionList = (dateJoined?: any, basedIn?: string, verifiedDate?: any) => {
    return [
        {
            id: 1,
            key: 'dateJoined',
            classname: 'icon icon--dateJoined',
            label: 'Date Joined',
            data: dateJoined
        },
        {
            id: 2,
            key: 'accountBasedIn',
            classname: 'icon icon--basedIn',
            label: 'Account based in',
            data: basedIn
        },
        {
            id: 3,
            key: 'verified',
            classname: 'icon icon--verified',
            label: 'Verified',
            data: verifiedDate || 'Not verified'
        },
    ]
}