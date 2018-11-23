export const currentStreakText = (currentStreak, isCurrentStreakWin) => {
    return isCurrentStreakWin ? 'W' + currentStreak : 'L' + currentStreak;
};

export const getPageSizeOptions = (playersData) => {
    if (playersData === undefined || playersData.length === 0) return [];
    const pageSizeLimitter = 5;
    const pagesLength = Math.ceil(playersData.length / pageSizeLimitter);
    return new Array(pagesLength).fill(0).map((value, i) => pageSizeLimitter * (i + 1));
}

export const reactTableStyles = {
    trProps: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '1.3rem',
    },
    thProps: {
        backgroundColor: '#fb653f',
        color: 'white',
        fontSize: '1.4rem',
        fontWeight: 600,
        padding: '1.2rem 1rem',
    }
};