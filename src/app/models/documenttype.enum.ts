export enum DocumentType {
  DNI = 'DNI',
  FOREIGN_DOCUMENT = 'FOREIGN DOCUMENT',
  PASSPORT = 'PASSPORT',
  NOT_FOUND = 'NOT FOUND'
}

export const DocumentTypeTranslations = {
  'en': {
    [DocumentType.DNI]: 'DNI',
    [DocumentType.FOREIGN_DOCUMENT]: 'FOREIGN DOCUMENT',
    [DocumentType.PASSPORT]: 'PASSPORT',
    [DocumentType.NOT_FOUND]: 'NOT FOUND'
  },
  'es': {
    [DocumentType.DNI]: 'DNI',
    [DocumentType.FOREIGN_DOCUMENT]: 'CARNET DE EXTRANJERIA',
    [DocumentType.PASSPORT]: 'PASAPORTE',
    [DocumentType.NOT_FOUND]: 'NO ENCONTRADO'
  }
};
