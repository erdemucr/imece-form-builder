// debug-helper.jsx
import React from "react";

export const DebugInfo = () => {
  const [imports, setImports] = React.useState({});

  React.useEffect(() => {
    // Tüm gerekli import'ları test et
    const testImports = async () => {
      const results = {};

      try {
        const sortableModule = await import("./sortable-form-elements");
        results.sortableFormElements = {
          success: true,
          keys: Object.keys(sortableModule.default || sortableModule),
          module: sortableModule,
        };
      } catch (error) {
        results.sortableFormElements = { success: false, error: error.message };
      }

      try {
        const formElementsModule = await import("./form-elements");
        results.formElements = {
          success: true,
          keys: Object.keys(formElementsModule.default || formElementsModule),
        };
      } catch (error) {
        results.formElements = { success: false, error: error.message };
      }

      setImports(results);
    };

    testImports();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        background: "white",
        border: "1px solid #ccc",
        padding: "15px",
        zIndex: 9999,
        maxWidth: "500px",
        maxHeight: "400px",
        overflow: "auto",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>🛠️ Debug Information</h3>

      <div style={{ marginBottom: "10px" }}>
        <h4>Import Status:</h4>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            fontSize: "12px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(imports, null, 2)}
        </pre>
      </div>

      <button
        onClick={() => {
          console.log("Current imports:", imports);
          console.log("Window object:", window);
        }}
        style={{ marginRight: "10px" }}
      >
        Log to Console
      </button>

      <button onClick={() => location.reload()}>Reload Page</button>
    </div>
  );
};

// App bileşeninde kullanım
export const useDebug = () => {
  const [showDebug, setShowDebug] = React.useState(true);

  return {
    showDebug,
    setShowDebug,
    DebugComponent: showDebug ? DebugInfo : () => null,
  };
};
