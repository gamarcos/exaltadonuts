export function update(key, data) {
    try {
        const current = get(key)
        const serializable = data.map(map => Object.fromEntries(map));
        save(key, [...current, ...serializable])
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

export function removeAll(key) {
    try {
        sessionStorage.removeItem(key)
        return true
      } catch (e) {
        console.error('Error to remove:', e);
        return false
      }
}


export function save(key, data) {
  try {
      sessionStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error to save:', e);
      return false;
    }
}


export function remove(item) {
  try {
      const items = get('summary')
      const data = items.filter((value) => value.id !== item)      
      save('summary', data);
      return true
    } catch (e) {
      console.error('Error to remove:', e);
      return false
    }
}
