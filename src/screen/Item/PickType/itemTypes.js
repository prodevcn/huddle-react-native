/* Modification to these enums are a MAJOR change and will BREAK
Item Type templating and possibly icons.
Addition is non-breaking and is allowed remember to check icon translation ItemListItem */
const typeEnum = {
  allergy: 'allergy',
  care: 'care',
  careDoc: 'careDoc',
  claims: 'claims',
  condition: 'condition',
  eduInfo: 'eduInfo',
  hospitalization: 'hospitalization',
  insurance: 'insurance',
  medication: 'medication',
  note: 'note',
  other: 'other',
  procedure: 'procedure',
  provider: 'provider',
  testResults: 'testResults',
  vaccination: 'vaccination',
  visit: 'visit',
};

export default typeEnum;

export const itemTypeLabels = {
  [typeEnum.other]: '',
  [typeEnum.allergy]: 'Allergy',
  [typeEnum.care]: 'Care Plan',
  [typeEnum.careDoc]: 'Advance Care Planning Document',
  [typeEnum.claims]: 'Claims, Bills & Receipts',
  [typeEnum.condition]: 'Condition',
  [typeEnum.eduInfo]: 'Educational Information',
  [typeEnum.hospitalization]: 'Hospitalization',
  [typeEnum.insurance]: 'Insurance',
  [typeEnum.medication]: 'Medication',
  [typeEnum.note]: 'Personal Note',
  [typeEnum.procedure]: 'Procedure',
  [typeEnum.provider]: 'Provider',
  [typeEnum.testResults]: 'Test Results',
  [typeEnum.vaccination]: 'Vaccination or Immunization',
  [typeEnum.visit]: 'Visit or Discharge Summary',
};
