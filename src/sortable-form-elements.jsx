// sortable-form-elements/index.js (ana export dosyası)
import {
  SortableElement,
  SortableItem,
  PlaceHolder,
} from "./sortable-form-elements";
import BaseFormElements from "./form-elements";
import { TwoColumnRow, ThreeColumnRow, MultiColumnRow } from "./multi-column";
import { FieldSet } from "./fieldset";
import CustomElement from "./form-elements/custom-element";

const {
  Header,
  Paragraph,
  Label,
  LineBreak,
  TextInput,
  EmailInput,
  PhoneNumber,
  NumberInput,
  TextArea,
  Dropdown,
  Checkboxes,
  DatePicker,
  RadioButtons,
  Image,
  Rating,
  Tags,
  Signature,
  HyperLink,
  Download,
  Camera,
  Range,
  FileUpload,
} = BaseFormElements;

const FormElements = {};

// Temel form elementlerini SortableElement ile sarmala
FormElements.Header = SortableElement(Header);
FormElements.Paragraph = SortableElement(Paragraph);
FormElements.Label = SortableElement(Label);
FormElements.LineBreak = SortableElement(LineBreak);
FormElements.TextInput = SortableElement(TextInput);
FormElements.EmailInput = SortableElement(EmailInput);
FormElements.PhoneNumber = SortableElement(PhoneNumber);
FormElements.NumberInput = SortableElement(NumberInput);
FormElements.TextArea = SortableElement(TextArea);
FormElements.Dropdown = SortableElement(Dropdown);
FormElements.Signature = SortableElement(Signature);
FormElements.Checkboxes = SortableElement(Checkboxes);
FormElements.DatePicker = SortableElement(DatePicker);
FormElements.RadioButtons = SortableElement(RadioButtons);
FormElements.Image = SortableElement(Image);
FormElements.Rating = SortableElement(Rating);
FormElements.Tags = SortableElement(Tags);
FormElements.HyperLink = SortableElement(HyperLink);
FormElements.Download = SortableElement(Download);
FormElements.Camera = SortableElement(Camera);
FormElements.FileUpload = SortableElement(FileUpload);
FormElements.Range = SortableElement(Range);

// Özel konteyner elementleri
FormElements.FieldSet = SortableElement(FieldSet);
FormElements.TwoColumnRow = SortableElement(TwoColumnRow);
FormElements.ThreeColumnRow = SortableElement(ThreeColumnRow);
FormElements.MultiColumnRow = SortableElement(MultiColumnRow);
FormElements.CustomElement = SortableElement(CustomElement);

// Yardımcı bileşenleri doğrudan export et
FormElements.PlaceHolder = PlaceHolder;
FormElements.SortableItem = SortableItem;
FormElements.SortableElement = SortableElement;

// Varsayılan form elementleri (sortable olmayan)
FormElements.BaseFormElements = BaseFormElements;

export default FormElements;

// Named exports için
export {
  SortableElement,
  SortableItem,
  PlaceHolder,
  BaseFormElements,
  TwoColumnRow,
  ThreeColumnRow,
  MultiColumnRow,
  FieldSet,
  CustomElement,
};
