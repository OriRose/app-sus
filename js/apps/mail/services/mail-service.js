import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'Email'

export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    getById
}

function query() {
    return storageService.query(EMAIL_KEY)
}

function remove(mailId) {
    return storageService.remove(EMAIL_KEY, mailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id)
}

function _createEmails() {
    let mails = utilService.loadFromStorage(EMAIL_KEY)
    if (!mails || !mails.length) {
        mails = []

        //Todo: Put some demo data here using _createMail

        utilService.saveToStorage(EMAIL_KEY, mails)
    }
    return mails;
}

function getEmptyMail() {
    return { id: '', sender: { name: '', address: '' }, content: '', topic: '', timestamp: Date.now() }
}

function _createMail(sender, content, topic, timestamp) {
    const mail = getEmptyMail();
    mail.id = utilService.makeId();
    mail.sender = sender
    mail.content = content
    mail.timestamp = timestamp
    return mail
}