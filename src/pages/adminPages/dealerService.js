const KEYS = {
    dealers: 'dealers',
    dealerId: 'dealerId'
}

export const getVariableCollection = () => ([
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
    { id: '4', title: '4' },
])

export function insertDealer(data) {
    let dealers = getAllDealers();
    data['id'] = generateDealerId()
    dealers.push(data)
    localStorage.setItem(KEYS.dealers, JSON.stringify(dealers))
}

export function updateDealer(data) {
    let dealers = getAllDealers();
    let recordIndex = dealers.findIndex(x => x.id == data.id);
    dealers[recordIndex] = { ...data }
    localStorage.setItem(KEYS.dealers, JSON.stringify(dealers));
}

export function deleteDealer(id) {
    let dealers = getAllDealers();
    dealers = dealers.filter(x => x.id != id)
    localStorage.setItem(KEYS.dealers, JSON.stringify(dealers));
}

export function generateDealerId() {
    if (localStorage.getItem(KEYS.dealerId) == null)
        localStorage.setItem(KEYS.dealerId, '0')
    var id = parseInt(localStorage.getItem(KEYS.dealerId))
    localStorage.setItem(KEYS.dealerId, (++id).toString())
    return id;
}

export function getAllDealers() {
    if (localStorage.getItem(KEYS.dealers) == null)
        localStorage.setItem(KEYS.dealers, JSON.stringify([]))
    let dealers = JSON.parse(localStorage.getItem(KEYS.dealers));
    
    let variables = getVariableCollection();
    return dealers.map(x => ({
        ...x,
        variable: variables[x.variableId - 1]?.title
    }))
}