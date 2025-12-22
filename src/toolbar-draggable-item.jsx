// toolbar-draggable-item.jsx
import React, { useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ID from "./UUID";

const ToolbarItem = ({ data, onCreate, onClick, index }) => {
  // Unique ID oluştur - useMemo ile sadece bir kere oluştur
  const itemId = useMemo(
    () => `toolbar-${data.key || data.element || data.name}-${ID.uuid()}`,
    [data.key, data.element, data.name]
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: itemId,
    data: {
      type: "TOOLBAR_ITEM",
      toolbarData: data,
      onCreate,
      isNewItem: true,
      source: "toolbar",
      index, // Sıralama için index
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging
      ? "none"
      : "transform 200ms ease, opacity 200ms ease",
    position: "relative",
    zIndex: isDragging ? 1000 : "auto",
  };

  const handleClick = (e) => {
    // Eğer sürükleme aktifse tıklamayı engelle
    if (isDragging) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e, data);
    }

    // Tıklama ile otomatik öğe oluşturma
    if (onCreate && !data.static) {
      const newItem = {
        id: ID.uuid(),
        element: data.element,
        text: data.name || data.text || data.element,
        field_name: `${data.element.toLowerCase()}_${Date.now()}`,
        static: data.static || false,
        required: data.required || false,
        bold: data.bold || false,
        italic: data.italic || false,
        content: data.content || "",
        read_only: data.readOnly || false,
        hide_label: data.hideLabel || false,
        label: data.label || data.name,
        className: data.className || "",
        placeholder: data.placeholder || "",
        value: data.value || "",
        // Özel konteynerler için
        childItems: data.childItems || null,
        isContainer: data.isContainer || false,
        // Varsayılan özellikleri merge et
        ...data.defaultProps,
      };

      // Öğe oluşturma callback'i çağır
      onCreate(newItem);
    }
  };

  // İkon render fonksiyonu
  const renderIcon = () => {
    if (data.icon) {
      if (data.icon.startsWith("fa-")) {
        return (
          <i className={`fa ${data.icon}`} style={{ marginRight: "8px" }}></i>
        );
      } else if (data.icon.startsWith("material-icons")) {
        return (
          <span className={data.icon} style={{ marginRight: "8px" }}></span>
        );
      } else {
        return <span style={{ marginRight: "8px" }}>{data.icon}</span>;
      }
    }
    return null;
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`toolbar-item ${isDragging ? "dragging" : ""} ${
        data.className || ""
      }`}
      title={data.description || data.name}
      data-element-type={data.element}
      data-toolbar-item={true}
    >
      {/* Sürükleme handle'ı */}
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        style={{
          cursor: "move",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          marginRight: "8px",
          opacity: 0.6,
          transition: "opacity 0.2s ease",
        }}
        className="drag-handle"
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <i
          className="fa fa-arrows"
          style={{ fontSize: "12px", color: "#666" }}
        ></i>
      </div>

      {/* İkon */}
      {renderIcon()}

      {/* Metin */}
      <span
        style={{
          fontSize: "14px",
          fontWeight: data.bold ? "bold" : "normal",
          fontStyle: data.italic ? "italic" : "normal",
          color: isDragging ? "#007bff" : "inherit",
        }}
      >
        {data.name}
      </span>

      {/* Gerekli ise badge */}
      {data.required && (
        <span
          style={{
            marginLeft: "8px",
            fontSize: "10px",
            color: "#dc3545",
            backgroundColor: "#ffeaea",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          Gerekli
        </span>
      )}

      {/* Sürükleme durumu için overlay */}
      {isDragging && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            border: "2px dashed #007bff",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />
      )}
    </li>
  );
};

// Prop types (geliştirme ortamı için)
ToolbarItem.defaultProps = {
  data: {},
  index: 0,
};

export default ToolbarItem;
