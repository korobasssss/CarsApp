export const formattedToApiDate = (date: string) => {
    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
}