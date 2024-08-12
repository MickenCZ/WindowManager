function generateID(existing_ids: Set<string>) {
    let id = window.crypto.randomUUID()
    while (!existing_ids.has(id)) {
        id = window.crypto.randomUUID()
    }
    return id
}

export default generateID