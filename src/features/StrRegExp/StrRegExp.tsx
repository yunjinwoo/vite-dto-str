import { useMemo, useState } from "react";
import { RouterButton } from "@shared/RouterButton";

import { navigatorClipboardWrite } from "@utils/navigatorClipboardWrite";
import ButtonTestCode from "./ButtonTestCode";
import { Str } from "@utils/Str";

interface Row {
  field_info: string;
  field: string;
  type: string;
  length: string;
}

const arrayToStr = (arr: Row[]) =>
  arr
    .map((r) => {
      return Object.values(r).join("\t");
    })
    .join("\n");

const newRow = () => {
  return {
    field_info: "",
    field: "",
    type: "",
    length: "",
  };
};

const isNotField = (field: string) =>
  [
    "prj_no",
    "project_no",
    "del_yn",
    "revision_status",
    "error_message",
    "error_col_arr",
    "error_yn",
  ].includes(field);

const extractFieldData = (line: string) => {
  const regexPatterns = [
    { regex: /private String (.*);/, type: "VARCHAR", length: "200" },
    { regex: /private Integer (.*);/, type: "DECIMAL", length: "(38, 0)" },
    { regex: /private Float (.*);/, type: "DECIMAL", length: "(13, 3)" },
    { regex: /private Double (.*);/, type: "DECIMAL", length: "(35, 5)" },
    { regex: /private [bB]oolean (.*);/, type: "TINYINT", length: "(1)" },
  ];

  for (const { regex, type, length } of regexPatterns) {
    const match = RegExp(regex).exec(line);
    if (match) {
      return { field: match[1], type, length };
    }
  }
  return null;
};

const extractFieldInfo = (line: string) => {
  const regex = /Schema\(description = "(.*)",/;
  const match = RegExp(regex).exec(line);
  return match ? match[1] : "";
};

const extractFieldList = (line: string) => {
  const regex = /private List<(.*)>(.*);/;
  const match = RegExp(regex).exec(line);
  return match ? match[1] : "";
};

const strToEndStr = (strStart: string) => {
  const list = strStart.split("\n");
  const items: Row[] = [];
  let row: Row = newRow();
  const itemsList: Row[] = [];
  let rowList: Row = newRow();
  let parsing = false;

  list.forEach((line) => {
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

      const fieldList = extractFieldList(line);
      if (fieldList) {
        rowList.field = fieldList;
        rowList.type = line;
      }

      if (row.field) {
        if (!isNotField(row.field)) {
          if (!row.field_info) {
            row.field_info = Str.toPascalCase(row.field, "_");
          }
          items.push({ ...row });
        }
        row = newRow();
      }

      if (rowList.field) {
        itemsList.push({ ...rowList });
        rowList = newRow();
      }
    }
  });

  return {
    result: arrayToStr(items),
    errResult: arrayToStr(itemsList),
  };
};

function StrRegExp() {
  const [javaCode, setJavaCode] = useState("");
  const { result, errResult } = useMemo(
    () => strToEndStr(javaCode),
    [javaCode]
  );

  return (
    <>
      <ButtonTestCode setTextCode={setJavaCode} />
      <RouterButton path="AppRefactor1">AppRefactor1</RouterButton>
      <RouterButton path="AppRefactor2">AppRefactor2</RouterButton>

      <div>
        <textarea
          rows={30}
          cols={150}
          onChange={(e) => setJavaCode(e.target.value)}
          defaultValue={javaCode}
        />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button onClick={() => navigatorClipboardWrite(result)}>
            copy field
          </button>
          <button onClick={() => navigatorClipboardWrite(errResult)}>
            copy list Dto
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <pre style={{ textAlign: "left" }}>{result}</pre>
          <pre style={{ color: "red" }}>{errResult}</pre>
        </div>
      </div>
    </>
  );
}

export default StrRegExp;
