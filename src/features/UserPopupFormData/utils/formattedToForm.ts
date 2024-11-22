export const formattedToForm = (date: string) => {
    const [month, day, year] = date.split('/')
    return `${year}-${month}-${day}`
}