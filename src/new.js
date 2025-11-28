const list = [2, 1, 3, 5, 6]

const listBy2 = list.map(n => n*2)
//console.log( listBy2)

const map = (list, project) => {
    const newList = []
    for (const element of list) {
        newList.push(project(element))

    }
    return newList
}

console.log(map(list, n=>n*2))

const filter = (list, predecate) => {
    const newList = []
    for (const element of list) {
        if (predecate(element)) newList.push(element)
    }
    return newList
}

console.log(filter(list, n=> n>2))

const groupBy = (list, grouper) => {
    const groups = {}
    for (const element of list) {
        const group = grouper(element)
        if (!groups[group]) {
            groups[group] = []
        }
        groups[group].push(element)
    }
    return groups
}

const obj = {
    [2*2]: 3,
    count: "Nikos"
}

console.log(obj, obj[4], obj["count"], obj.count, obj[23])

console.log(groupBy([6.1, 4.2, 6.3], Math.floor))

// => { '4': [4.2], '6': [6.1, 6.3] }
 
// The `_.property` iteratee shorthand.
console.log(groupBy(['one', 'two', 'three'], str => str.length))
// => { '3': ['one', 'two'], '5': ['three'] }

console.log(Object.entries(obj))