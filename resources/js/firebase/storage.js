import { db, storage } from './firebase';

// KYC API

export const doUploadPassport = (name, file) =>
  storage.ref().child(`passport/${name}`).put(file, { contentType: file.type })

export const doUploadAddress = (name, file) =>
  storage.ref().child(`address/${name}`).put(file, { contentType: file.type })

export const doUploadDocument = (name, file) =>
  storage.ref().child(`document/${name}`).put(file, { contentType: file.type })
