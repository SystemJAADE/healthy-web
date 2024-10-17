export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export const GenderTranslations = {
  'en': {
    [Gender.MALE]: 'Male',
    [Gender.FEMALE]: 'Female',
    [Gender.OTHER]: 'Other'
  },
  'es': {
    [Gender.MALE]: 'Masculino',
    [Gender.FEMALE]: 'Femenino',
    [Gender.OTHER]: 'Otro'
  }
};
