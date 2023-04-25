const arr = [
    1,
    2,
    3,
]

function s() {
    arr.reduce((acc, i, prev) => {
        if(acc === 0) {
            acc = i
        } else if(prev < i) {
            acc = i
        }

        return acc

    }, 0)
}

console.log()