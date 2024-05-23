import { useMemo, useState } from "react";
import "./App.css";

interface Row {
  field_info: string;
  field: string;
  type: string;
  length: string;
}
const newRow = () => {
  return {
    field_info: "",
    field: "",
    type: "",
    length: "",
  };
};
const navigatorClipboardWrite = (text: string) => {
  /**
   * navigator.clipboard.writeText VDI 안 edge 에선 안됨...
   */
  const copyToClipboard = (val: string) => {
    try {
      const t = document.createElement("textarea");
      const copyarea = document.getElementById("copyarea");
      if (copyarea) {
        copyarea.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand("copy");
        copyarea.removeChild(t);
      }

      alert("복사 되었습니다. old");
    } catch (e) {
      console.error("copyToClipboard", e);
    }
  };

  try {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("복사 되었습니다.");
        console.log("Content copied to clipboard");
      })
      .catch((error) => {
        copyToClipboard(text);
        console.error("Failed to copy: ", error);
      });
  } catch {
    copyToClipboard(text);
  }
};

function toPascalCase(
  input: string,
  separatorSplit: string = " ",
  separatorJoin: string = " "
) {
  return input
    .split(separatorSplit)
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(separatorJoin);
}

const isNotField = (field: string) =>
  [
    "prj_no",
    "del_yn",
    "revision_status",
    "error_message",
    "error_col_arr",
    "error_yn",
  ].includes(field);

const RegExpGroup = (findStr: string) => {
  //let matchData:RegExpMatchArray | null = null
  const isDesc = (field: string) => {
    const regex = /.(remark|desc|description)$/;
    return RegExp(regex).exec(field);
  };
  const isString = () => {
    const regex = /private String (.*);/;
    return RegExp(regex).exec(findStr);
  };
  const isInteger = () => {
    const regex = /private Integer (.*);/;
    return RegExp(regex).exec(findStr);
  };
  const isFloat = () => {
    const regexFloat = /private Float (.*);/;
    return RegExp(regexFloat).exec(findStr);
  };
  const isDouble = () => {
    const regex = /private Double (.*);/;
    return RegExp(regex).exec(findStr);
  };
  const isBoolean = () => {
    const regex = /private [bB]oolean (.*);/;
    return RegExp(regex).exec(findStr);
  };
  const isList = () => {
    const regex = /private List<(.*)>(.*);/;
    /** if( RegExp(regex).exec(findStr) ){
      console.log(findStr, 'isList', RegExp(regex).exec(findStr))
      

      [
        "private String document_no;",
        "document_no"
    ]

    //[
    // "private List<DeliverableInterfaceDto> queryResult;",
    // "DeliverableInterfaceDto",
    // " queryResult"
    //   ]
    } */

    return RegExp(regex).exec(findStr);
  };

  const isFieldInfo = () => {
    const regex = /Schema\(description = "(.*)",/;
    return RegExp(regex).exec(findStr);
  };

  return {
    isDesc,
    isString,
    isInteger,
    isFloat,
    isDouble,
    isBoolean,
    isFieldInfo,
    isList,
  };
};

function App() {
  const [javaCode, setJavaCode] = useState("");
  const strToEndStr = (strStart: string) => {
    const list = strStart.split("\n");
    let flag = false;
    const items: Row[] = [];
    let row: Row = newRow();
    const itemsList: Row[] = [];
    let rowList: Row = newRow();

    list.forEach((r) => {
      if (r.indexOf("public class") !== -1) {
        flag = true;
      }
      if (flag) {
        /* 
        const RegExpData = RegExpGroup(r);
        if( matchData = RegExpData.isString() && RegExpData.matchData){
          row.field = RegExpData.matchData[1];
          row.type = "VARCHAR";
          row.length = RegExpData.isDesc(row.field) ? '500' : '200'
        }else if( RegExpData.isInteger() && RegExpData.matchData){
          row.field = RegExpData.matchData[1];
          row.type = "DECIMAL";
          row.length = "(38, 0)";
        }else if( RegExpData.isFloat() && RegExpData.matchData){
          row.field = RegExpData.matchData[1];
          row.type = "DECIMAL";
          row.length = "(13, 3)";
        }else if( RegExpData.isDouble() && RegExpData.matchData){
          row.field = RegExpData.matchData[1];
          row.type = "DECIMAL";
          row.length = "(35, 5)";
        }else if( RegExpData.isBoolean() && RegExpData.matchData){
          row.field = RegExpData.matchData[1];
          row.type = "TINYINT";
          row.length = "(1)";
        } */

        const RegExpData = RegExpGroup(r);
        const stringMatchData = RegExpData.isString();
        if (stringMatchData) {
          row.field = stringMatchData[1];
          row.type = "VARCHAR";
          row.length = RegExpData.isDesc(row.field) ? "500" : "200";
        }

        const matchDataInteger = RegExpData.isInteger();
        if (matchDataInteger) {
          row.field = matchDataInteger[1];
          row.type = "DECIMAL";
          row.length = "(38, 0)";
        }

        const matchDataFloat = RegExpData.isFloat();
        if (matchDataFloat) {
          row.field = matchDataFloat[1];
          row.type = "DECIMAL";
          row.length = "(13, 3)";
        }

        const matchDataDouble = RegExpData.isDouble();
        if (matchDataDouble) {
          row.field = matchDataDouble[1];
          row.type = "DECIMAL";
          row.length = "(35, 5)";
        }

        const matchDataBoolean = RegExpData.isBoolean();
        if (matchDataBoolean) {
          row.field = matchDataBoolean[1];
          row.type = "TINYINT";
          row.length = "(1)";
        }

        const matchDataFieldInfo = RegExpData.isFieldInfo();
        if (matchDataFieldInfo) {
          row.field_info = matchDataFieldInfo[1];
        }

        const matchDataList = RegExpData.isList();
        if (matchDataList) {
          rowList.field = matchDataList[1];
          rowList.type = r;
        }
      }

      if (row.field) {
        if (!isNotField(row.field)) {
          if (!row.field_info) {
            row.field_info = toPascalCase(row.field, "_");
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
    return {
      items,
      itemsList,
    };
  };
  const { endResult, listResult } = useMemo(() => {
    const { items: strList, itemsList } = strToEndStr(javaCode);
    //console.log(javaCode, " => strList", strList);
    console.log("itemsList", itemsList);
    return {
      endResult: strList
        .map((r) => {
          return Object.values(r).join("\t");
        })
        .join("\n"),
      listResult: itemsList
        .map((r) => {
          return Object.values(r).join("\t");
        })
        .join("\n"),
    };
  }, [javaCode]);

  //console.log("endResult", endResult);
  return (
    <>
      <div>
        <textarea
          rows={30}
          cols={150}
          onChange={(e) => setJavaCode(e.target.value)}
        >
          {javaCode}
        </textarea>
        <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
          <button onClick={() => navigatorClipboardWrite(endResult)}>
            copy field
          </button>
          <button onClick={() => navigatorClipboardWrite(listResult)}>
            copy list Dto
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <pre style={{textAlign:'left'}}>{endResult}</pre>
          <pre style={{color:'red'}}>{listResult}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
