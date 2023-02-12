const KEYS = {
    subscriptions: 'subscriptions',
    subscriptionId: 'subscriptionId'
}

export const getVariableCollection = () => ([
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
    { id: '4', title: '4' },
])

export function insertSubscription(data) {
    let subscriptions = getAllSubscriptions();
    data['id'] = generateSubscriptionId()
    subscriptions.push(data)
    localStorage.setItem(KEYS.subscriptions, JSON.stringify(subscriptions))
}

export function updateSubscription(data) {
    let subscriptions = getAllSubscriptions();
    let recordIndex = subscriptions.findIndex(x => x.id == data.id);
    subscriptions[recordIndex] = { ...data }
    localStorage.setItem(KEYS.subscriptions, JSON.stringify(subscriptions));
}

export function deleteSubscription(id) {
    let subscriptions = getAllSubscriptions();
    subscriptions = subscriptions.filter(x => x.id != id)
    localStorage.setItem(KEYS.subscriptions, JSON.stringify(subscriptions));
}

export function generateSubscriptionId() {
    if (localStorage.getItem(KEYS.subscriptionId) == null)
        localStorage.setItem(KEYS.subscriptionId, '0')
    var id = parseInt(localStorage.getItem(KEYS.subscriptionId))
    localStorage.setItem(KEYS.subscriptionId, (++id).toString())
    return id;
}

export function getAllSubscriptions() {
    if (localStorage.getItem(KEYS.subscriptions) == null)
        localStorage.setItem(KEYS.subscriptions, JSON.stringify([]))
    let subscriptions = JSON.parse(localStorage.getItem(KEYS.subscriptions));
    
    let variables = getVariableCollection();
    return subscriptions.map(x => ({
        ...x,
        variable: variables[x.variableId - 1]?.title
    }))
}