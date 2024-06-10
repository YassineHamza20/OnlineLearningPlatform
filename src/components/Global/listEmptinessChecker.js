export const listEmptinessChecker = (list) => {
    const newList = list.filter(item=> !item.title || !item.description)
    if(newList.length > 0) {
        return true
    }
    else {
        return false
    }
}