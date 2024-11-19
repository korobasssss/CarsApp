export const formattedDate = (date: string) => {
    const [month, day, year] = date.split('/')
    return `${day}.${month}.${year}`
}