export function save(key, data) {
    try {
        const current = get(key)
        const serializable = data.map(map => Object.fromEntries(map));
        const fulldata = JSON.stringify([...current, ...serializable])
        sessionStorage.setItem(key, fulldata);
        return true;
      } catch (e) {
        console.error('Error to save:', e);
        return false;
      }
}

export function get(key) {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error('Error to recovery:', e);
        return [];
      }
}

export function remove(key) {
    try {
        sessionStorage.removeItem(key)
        return true
      } catch (e) {
        console.error('Error to remove:', e);
        return false
      }
}
