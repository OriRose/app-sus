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

_createEmails()

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
    let d = new Date()
    let mails = utilService.loadFromStorage(EMAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        //Todo: make better demo data
        mails.push(_createMail('Alvin Pennell','pukiMcPuck@bouncy.mail','hi!','Hello',d.toLocaleString(),'inbox',false))
        mails.push(_createMail('Mireille Urick','shukiMcShocko@jmail.com','Greetings, human!','Welcome to the Universe',d.toLocaleString(),'inbox',false))
        mails.push(_createMail('Tyler Stoner','muki@amazon.mail.org','You made 153485$ this month','Revenue Report',d.toLocaleString(),'inbox',false))
        mails.push(_createMail('Goliath Bank','noreply@goliathBank.org','Your stocks portfolio was updated.','Stocks Portfolio',d.toLocaleString(),'inbox',false))
        mails.push(_createMail('Spongebob','spongebob@oceanicmail.com','Your order of 1 krabby patty is on its way','Krabby Patty Order',d.toLocaleString(),'inbox',false))
        // mails.push(_createMail('Ethelyn Tillman','noreply@spam.com','No depending be convinced in unfeeling he. Excellence she unaffected and too sentiments her. Rooms he doors there ye aware in by shall. Education remainder in so cordially. His remainder and own dejection daughters sportsmen. Is easy took he shed to kind.','Spam',d.toLocaleString(),'inbox',false))
        utilService.saveToStorage(EMAIL_KEY, mails)
    }
    return mails;
}

function getEmptyMail() {
    let d = new Date()
    return { id: '', sender: { name: '', address: '' }, content: '', subject: '', timestamp: d.toLocaleString(), folder: '', isStarred: false, wasRead: false }
}

function _createMail(senderName, senderAddress, content, subject, timestamp, folder, isStarred) {
    const mail = getEmptyMail();
    mail.id = utilService.makeId();
    mail.sender.name = senderName
    mail.sender.address = senderAddress
    mail.content = content
    mail.subject = subject
    mail.timestamp = timestamp
    mail.folder = folder
    mail.isStarred = isStarred
    return mail
}