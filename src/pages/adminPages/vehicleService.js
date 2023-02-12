const KEYS = {
    vehicles: 'vehicles',
    vehicleId: 'vehicleId'
}

export const getVariableCollection = () => ([
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
    { id: '4', title: '4' },
])

export function insertVehicle(data) {
    let vehicles = getAllVehicles();
    data['id'] = generateVehicleId()
    vehicles.push(data)
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles))
}

export function updateVehicle(data) {
    let vehicles = getAllVehicles();
    let recordIndex = vehicles.findIndex(x => x.id == data.id);
    vehicles[recordIndex] = { ...data }
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
}

export function deleteVehicle(id) {
    let vehicles = getAllVehicles();
    vehicles = vehicles.filter(x => x.id != id)
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
}

export function generateVehicleId() {
    if (localStorage.getItem(KEYS.vehicleId) == null)
        localStorage.setItem(KEYS.vehicleId, '0')
    var id = parseInt(localStorage.getItem(KEYS.vehicleId))
    localStorage.setItem(KEYS.vehicleId, (++id).toString())
    return id;
}

export function getAllVehicles() {
    if (localStorage.getItem(KEYS.vehicles) == null)
        localStorage.setItem(KEYS.vehicles, JSON.stringify([]))
    let vehicles = JSON.parse(localStorage.getItem(KEYS.vehicles));
    
    let variables = getVariableCollection();
    return vehicles.map(x => ({
        ...x,
        variable: variables[x.variableId - 1]?.title
    }))
}