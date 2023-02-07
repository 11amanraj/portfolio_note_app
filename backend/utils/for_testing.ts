const reverse = (string: string) => {
    return string
        .split('')
        .reverse()
        .join('')
}
  
const average = (array: number[]) => {
    const reducer = (sum: number, item: number) => {
        return sum + item
    }
  
    return array.reduce(reducer, 0) / array.length
}

const tests = {
    reverse,
    average
}

export default tests
  
// module.exports = {
//     reverse,
//     average,
// }