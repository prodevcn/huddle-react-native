import { itemTypes } from '/screen/Item/PickType';

import Medication from '/partial/ItemForm/subform/Medication';
import Insurance from '/partial/ItemForm/subform/Insurance';
import Other from '/partial/ItemForm/subform/Other';
import Allergy from '/partial/ItemForm/subform/Allergy';
import Care from '/partial/ItemForm/subform/Care';
import CareDocument from '/partial/ItemForm/subform/CareDocument';
import Claims from '/partial/ItemForm/subform/Claims';
import Condition from '/partial/ItemForm/subform/Condition';
import EducationalInformation from '/partial/ItemForm/subform/EducationalInformation';
import Hospitalization from '/partial/ItemForm/subform/Hospitalization';
import Procedure from '/partial/ItemForm/subform/Procedure';
import Provider from '/partial/ItemForm/subform/Provider';
import TestResults from '/partial/ItemForm/subform/TestResults';
import Vaccination from '/partial/ItemForm/subform/Vaccination';
import Visit from '/partial/ItemForm/subform/Visit';

export default {
  [itemTypes.allergy]: Allergy,
  [itemTypes.care]: Care,
  [itemTypes.careDoc]: CareDocument,
  [itemTypes.claims]: Claims,
  [itemTypes.condition]: Condition,
  [itemTypes.eduInfo]: EducationalInformation,
  [itemTypes.hospitalization]: Hospitalization,
  [itemTypes.insurance]: Insurance,
  [itemTypes.medication]: Medication,
  [itemTypes.other]: Other,
  [itemTypes.note]: Other,
  [itemTypes.procedure]: Procedure,
  [itemTypes.provider]: Provider,
  [itemTypes.testResults]: TestResults,
  [itemTypes.vaccination]: Vaccination,
  [itemTypes.visit]: Visit,
};
