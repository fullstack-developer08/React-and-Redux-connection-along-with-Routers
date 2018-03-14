export const setValue = (name, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(name, serializedValue);
    } catch (err) {

    }

}

export const getValue = (name) => {
    try {
        const serializedValue = localStorage.getItem(name);
        if (serializedValue === null) {
            return undefined;
        }
        return JSON.parse(serializedValue)
    } catch (err) {
        return undefined;
    }
}