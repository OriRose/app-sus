import{storageService} from './async-storage-service.js'

export const keepService={
    query,
    remove,
    save,
    getById
}

function query(){
    var notes=storageService.query('notes');
    return Promise.resolve(notes);
}
function remove(noteId) {
    return storageService.remove('notes', noteId);
}

function save(note) {
    if (note.id) {
        return storageService.put('notes', note);
    } else {
        return storageService.post('notes', note);
    }
}

function getById(id) {
    return storageService.get('notes', id);
}
