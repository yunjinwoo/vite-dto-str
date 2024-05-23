import { useMemo, useState } from "react";
import { Str } from "../../utils/Str";
import { navigatorClipboardWrite } from "../../utils/navigatorClipboardWrite";

/**
 * chatGPT 에 요청해서 받은 코드
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

const isNotField = (field: string): boolean =>
  [
    "prj_no",
    "del_yn",
    "revision_status",
    "error_message",
    "error_col_arr",
    "error_yn",
  ].includes(field);

const createRegExpMatchers = (findStr: string) => ({
  isDesc: (field: string) => /.(remark|desc|description)$/.exec(field),
  isString: () => /private String (.*);/.exec(findStr),
  isInteger: () => /private Integer (.*);/.exec(findStr),
  isFloat: () => /private Float (.*);/.exec(findStr),
  isDouble: () => /private Double (.*);/.exec(findStr),
  isBoolean: () => /private [bB]oolean (.*);/.exec(findStr),
  isList: () => /private List<(.*)>(.*);/.exec(findStr),
  isFieldInfo: () => /Schema\(description = "(.*)",/.exec(findStr),
});

const processRow = (
  line: string,
  row: Row,
  rowList: Row,
  matchers: ReturnType<typeof createRegExpMatchers>
): { row: Row; rowList: Row } => {
  if (line.includes("public class")) return { row, rowList };

  const matchString = matchers.isString();
  if (matchString) {
    row.field = matchString[1];
    row.type = "VARCHAR";
    row.length = matchers.isDesc(row.field) ? "500" : "200";
  }

  const matchInteger = matchers.isInteger();
  if (matchInteger) {
    row.field = matchInteger[1];
    row.type = "DECIMAL";
    row.length = "(38, 0)";
  }

  const matchFloat = matchers.isFloat();
  if (matchFloat) {
    row.field = matchFloat[1];
    row.type = "DECIMAL";
    row.length = "(13, 3)";
  }

  const matchDouble = matchers.isDouble();
  if (matchDouble) {
    row.field = matchDouble[1];
    row.type = "DECIMAL";
    row.length = "(35, 5)";
  }

  const matchBoolean = matchers.isBoolean();
  if (matchBoolean) {
    row.field = matchBoolean[1];
    row.type = "TINYINT";
    row.length = "(1)";
  }

  const matchFieldInfo = matchers.isFieldInfo();
  if (matchFieldInfo) {
    row.field_info = matchFieldInfo[1];
  }

  const matchList = matchers.isList();
  if (matchList) {
    rowList.field = matchList[1];
    rowList.type = line;
  }

  return { row, rowList };
};

const strToEndStr = (strStart: string) => {
  const lines = strStart.split("\n");
  const items: Row[] = [];
  const itemsList: Row[] = [];
  let row = newRow();
  let rowList = newRow();
  const matchers = createRegExpMatchers("");

  lines.forEach((line) => {
    const { row: updatedRow, rowList: updatedRowList } = processRow(
      line,
      row,
      rowList,
      matchers
    );
    row = updatedRow;
    rowList = updatedRowList;

    if (row.field) {
      if (!isNotField(row.field)) {
        if (!row.field_info) {
          row.field_info = Str.toPascalCase(row.field, "_");
        }
        items.push({ ...row });
      }
      row = newRow();

      if (rowList.field) {
        itemsList.push({ ...rowList });
        rowList = newRow();
      }
    }
  });

  console.log("items", items);
  console.log("itemsList", itemsList);
  return { items, itemsList };
};

function AppRefactor2() {
  const [javaCode, setJavaCode] = useState("");
  const { endResult, listResult } = useMemo(() => {
    const { items, itemsList } = strToEndStr(javaCode);
    return {
      endResult: items.map((row) => Object.values(row).join("\t")).join("\n"),
      listResult: itemsList
        .map((row) => Object.values(row).join("\t"))
        .join("\n"),
    };
  }, [javaCode]);

  return (
    <div>
      <textarea
        rows={30}
        cols={150}
        onChange={(e) => setJavaCode(e.target.value)}
        defaultValue={javaCode}
      />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={() => navigatorClipboardWrite(endResult)}>
          copy field
        </button>
        <button onClick={() => navigatorClipboardWrite(listResult)}>
          copy list Dto
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <pre style={{ textAlign: "left" }}>{endResult}</pre>
        <pre style={{ color: "red" }}>{listResult}</pre>
      </div>
    </div>
  );
}

export default AppRefactor2;
