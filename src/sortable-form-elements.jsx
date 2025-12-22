// sortable-form-elements/index.js
import React from "react";
import BaseFormElements from "./form-elements";
import { TwoColumnRow, ThreeColumnRow, MultiColumnRow } from "./multi-column";
import { FieldSet } from "./fieldset";
import CustomElement from "./form-elements/custom-element";

// Tüm sortable bileşenleri tek bir yerden import et
import {
  SortableElement,
  SortableItem,
  PlaceHolder,
  DraggableCard,
  createDraggableCard, // createDraggableCard artık named export olarak var
} from "./sortable-element";

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

// Yardımcı fonksiyon: bileşenleri güvenli şekilde sarmala
const createSortable = (Component, name) => {
  if (!Component) {
    console.warn(`⚠️ ${name} bileşeni tanımsız, sortable yapılamıyor`);

    const ErrorComponent = () => (
      <div
        style={{
          border: "2px dashed #f00",
          padding: "10px",
          backgroundColor: "#ffe6e6",
          color: "#c00",
          marginBottom: "10px",
        }}
      >
        ⚠️ Hata: {name} bileşeni yüklenemedi
      </div>
    );

    return ErrorComponent;
  }

  try {
    // Bileşen zaten sarmalanmış mı kontrol et
    if (
      Component.displayName?.includes("Draggable") ||
      Component.name?.includes("Draggable")
    ) {
      console.log(`ℹ️ ${name} zaten draggable, tekrar sarmalanmadı`);
      return Component;
    }

    const SortableComponent = createDraggableCard(Component);

    // Display name ayarla (debug için)
    SortableComponent.displayName = `Draggable${name}`;

    // Orijinal bileşeni referans olarak sakla
    SortableComponent.OriginalComponent = Component;

    return SortableComponent;
  } catch (error) {
    console.error(`❌ ${name} için sortable bileşen oluşturulamadı:`, error);

    const ErrorFallback = (props) => (
      <div
        style={{
          border: "2px dashed #ff6b6b",
          padding: "15px",
          marginBottom: "10px",
          backgroundColor: "#ffeaea",
          color: "#d63031",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>⚠️ {name} Yüklenemedi</h4>
        <p>Bileşen oluşturulurken hata oluştu.</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Hata: {error.message}
        </p>
      </div>
    );

    ErrorFallback.displayName = `Error${name}`;
    return ErrorFallback;
  }
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

// SortableItem (zaten draggable olabilir)
FormElements.SortableItem = SortableItem;

// SortableElement'i de ekle
FormElements.SortableElement = SortableElement;

// Yardımcı fonksiyonları export et
FormElements.createSortable = createSortable;
FormElements.createDraggableCard = createDraggableCard;

// Debug için konsola yazdır
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("📋 FormElements başarıyla yüklendi:");

  const elementStats = Object.keys(FormElements).map((key) => {
    const element = FormElements[key];
    return {
      key,
      type: typeof element,
      isFunction: typeof element === "function",
      displayName: element?.displayName || element?.name || "N/A",
      isReactComponent:
        element?.$$typeof === Symbol.for("react.element") ||
        element?.prototype?.isReactComponent,
    };
  });

  console.table(elementStats);

  // Hata ayıklama için global erişim (sadece development'ta)
  if (process.env.NODE_ENV === "development") {
    window.FormElementsDebug = FormElements;
  }
}

// Varsayılan export
export default FormElements;

// Named exports - TEK BİR YERDE export edin
export {
  SortableElement,
  SortableItem,
  PlaceHolder,
  DraggableCard,
  createDraggableCard,
  BaseFormElements,
  TwoColumnRow,
  ThreeColumnRow,
  MultiColumnRow,
  FieldSet,
  CustomElement,
  createSortable,
};

// Tüm bileşenleri tek bir obje olarak da export et
export const AllFormElements = FormElements;
