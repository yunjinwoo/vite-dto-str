import { useMemo, useState } from "react";
import { navigatorClipboardWrite } from "../../utils/navigatorClipboardWrite";

/**
 * 이전 App.tsx으로 chatGPT 에 요청해서 받은 코드
 */

interface Row {
  field_info: string;
  field: string;
  type: string;
  length: string;
}

const newRow = (): Row => ({
  field_info: "",
  field: "",
  type: "",
  length: "",
});

const extractFieldData = (line: string) => {
  const regexPatterns = [
    { regex: /private String (.*);/, type: "VARCHAR", length: "200" },
    { regex: /private Integer (.*);/, type: "DECIMAL", length: "(38, 0)" },
    { regex: /private Float (.*);/, type: "DECIMAL", length: "(13, 3)" },
    { regex: /private Double (.*);/, type: "DECIMAL", length: "(35, 5)" },
    { regex: /private [bB]oolean (.*);/, type: "TINYINT", length: "(1)" },
  ];

  for (const { regex, type, length } of regexPatterns) {
    const match = line.match(regex);
    if (match) {
      return { field: match[1], type, length };
    }
  }
  return null;
};

const extractFieldInfo = (line: string) => {
  const regex = /Schema\(description = "(.*)",/;
  const match = line.match(regex);
  return match ? match[1] : "";
};

const strToEndStr = (strStart: string): Row[] => {
  const lines = strStart.split("\n");
  const items: Row[] = [];
  let row = newRow();
  let parsing = false;

  lines.forEach((line) => {
    if (line.includes("public class")) {
      parsing = true;
    }

    if (parsing) {
      const fieldData = extractFieldData(line);
      if (fieldData) {
        row = { ...row, ...fieldData };
        if (/.(remark|desc|description)$/.test(row.field)) {
          row.length = "500";
        }
      }

      const fieldInfo = extractFieldInfo(line);
      if (fieldInfo) {
        row.field_info = fieldInfo;
      }

      if (row.field) {
        items.push(row);
        row = newRow();
      }
    }
  });

  console.log("items", items);
  return items;
};

function AppRefactor1() {
  const [javaCode, setJavaCode] = useState("");
  const endResult = useMemo(() => {
    const rows = strToEndStr(javaCode);
    const result = rows.map((row) => Object.values(row).join("\t")).join("\n");
    console.log("result", result);
    return result;
  }, [javaCode]);

  return (
    <div>
      <textarea
        rows={50}
        cols={150}
        onChange={(e) => setJavaCode(e.target.value)}
        defaultValue={javaCode}
      />
      <div>
        <button onClick={() => navigatorClipboardWrite(endResult)}>copy</button>
      </div>
      <pre>{endResult}</pre>
    </div>
  );
}

export default AppRefactor1;
