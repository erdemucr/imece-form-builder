// sortable-form-elements/index.js
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

// Tüm form elementlerini oluştur
const FormElements = {};

// Helper function to safely create sortable elements
const createSortable = (Component, name) => {
  if (!Component) {
    console.warn(`Component ${name} is undefined, cannot make sortable`);
    return () => <div>Error: {name} not found</div>;
  }
  return SortableElement(Component);
};

// Temel form elementleri
FormElements.Header = createSortable(Header, "Header");
FormElements.Paragraph = createSortable(Paragraph, "Paragraph");
FormElements.Label = createSortable(Label, "Label");
FormElements.LineBreak = createSortable(LineBreak, "LineBreak");
FormElements.TextInput = createSortable(TextInput, "TextInput");
FormElements.EmailInput = createSortable(EmailInput, "EmailInput");
FormElements.PhoneNumber = createSortable(PhoneNumber, "PhoneNumber");
FormElements.NumberInput = createSortable(NumberInput, "NumberInput");
FormElements.TextArea = createSortable(TextArea, "TextArea");
FormElements.Dropdown = createSortable(Dropdown, "Dropdown");
FormElements.Signature = createSortable(Signature, "Signature");
FormElements.Checkboxes = createSortable(Checkboxes, "Checkboxes");
FormElements.DatePicker = createSortable(DatePicker, "DatePicker");
FormElements.RadioButtons = createSortable(RadioButtons, "RadioButtons");
FormElements.Image = createSortable(Image, "Image");
FormElements.Rating = createSortable(Rating, "Rating");
FormElements.Tags = createSortable(Tags, "Tags");
FormElements.HyperLink = createSortable(HyperLink, "HyperLink");
FormElements.Download = createSortable(Download, "Download");
FormElements.Camera = createSortable(Camera, "Camera");
FormElements.FileUpload = createSortable(FileUpload, "FileUpload");
FormElements.Range = createSortable(Range, "Range");

// Özel konteyner elementleri
FormElements.FieldSet = createSortable(FieldSet, "FieldSet");
FormElements.TwoColumnRow = createSortable(TwoColumnRow, "TwoColumnRow");
FormElements.ThreeColumnRow = createSortable(ThreeColumnRow, "ThreeColumnRow");
FormElements.MultiColumnRow = createSortable(MultiColumnRow, "MultiColumnRow");
FormElements.CustomElement = createSortable(CustomElement, "CustomElement");

// PlaceHolder (SortableElement ile sarmalanmamış)
FormElements.PlaceHolder = PlaceHolder;

// Yardımcı bileşenler
FormElements.SortableItem = SortableItem;
FormElements.SortableElement = SortableElement;

// Debug için konsola yazdır
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log(
    "📋 FormElements loaded:",
    Object.keys(FormElements).map((key) => ({
      key,
      type: typeof FormElements[key],
    }))
  );
}

// Varsayılan export
export default FormElements;

// Named exports
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
