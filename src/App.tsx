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

const copyToClipboard = (val: string) => {
  /**
   * navigator.clipboard.writeText VDI 안 edge 에선 안됨...
   */
  try {
    const t = document.createElement('textarea');
    const copyarea = document.getElementById('copyarea');
    if (copyarea) {
      copyarea.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand('copy');
      copyarea.removeChild(t);
    }

    alert('복사 되었습니다..');
  } catch (e) {
    console.error('copyToClipboard', e);
  }
};

function App() {
  const [javaCode, setJavaCode] = useState("");
  const strToEndStr = (strStart: string) => {
    const list = strStart.split("\n");
    let flag = false;
    const items: Row[] = [];
    let row: Row = newRow();

    list.forEach((r) => {
      if (r.indexOf("public class") !== -1) {
        flag = true;
      }
      if (flag) {
        const regex2 = /private String (.*);/;
        const matchData2 = r.match(regex2);
        if (matchData2) {
          row.field = matchData2[1];
          row.type = "VARCHAR";

          const regex = /.(remark|desc|description)$/;
          const matchData = row.field.match(regex);
          if (matchData) {
            row.length = "500";
          } else {
            row.length = "200";
          }
        }

        //const s = '@Schema(description = "Project No."';
        const regex = /Schema\(description = "(.*)",/;
        const matchData = r.match(regex);
        if (matchData) {
          row.field_info = matchData[1];
        }

        const regexInt = /private Integer (.*);/;
        const matchDataInt = r.match(regexInt);
        if (matchDataInt) {
          row.field = matchDataInt[1];
          row.type = "DECIMAL";

          row.length = "(38, 0)";
        }

        
        const regexFloat = /private Float (.*);/;
        const matchDataFloat = r.match(regexFloat);
        if (matchDataFloat) {
          row.field = matchDataFloat[1];
          row.type = "DECIMAL";

          row.length = "(13, 3)";
        }
        
        const regexDouble = /private Double (.*);/;
        const matchDataDouble = r.match(regexDouble);
        if (matchDataDouble) {
          row.field = matchDataDouble[1];
          row.type = "DECIMAL";

          row.length = "(35, 5)";
        }
        
        const regexBool = /private [bB]oolean (.*);/;
        const matchDataBool = r.match(regexBool);
        if (matchDataBool) {
          row.field = matchDataBool[1];
          row.type = "TINYINT";

          row.length = "(1)";
        }
      }
      
        
      if (row.field) {
        items.push(row);
        row = newRow();
      }
    });

    console.log("items", items);
    return items;
  };
  const endResult = useMemo(() => {
    const strList = strToEndStr(javaCode);
    console.log("strList", strList);
    console.log(
      "strList.map",
      strList
        .map((r) => {
          return Object.values(r).join("\t");
        })
        .join("\n")
    );
    return strList
      .map((r) => {
        return Object.values(r).join("\t");
      })
      .join("\n");
  }, [javaCode]);

  console.log("endResult", endResult);
  return (
    <>
      <div>
        <textarea
          rows={50}
          cols={150}
          onChange={(e) => setJavaCode(e.target.value)}
        >
          {javaCode}
        </textarea>
        <div>
          <button
            onClick={() =>
              navigator.clipboard
                .writeText(endResult)
                .then(() => {
                  alert("복사 되었습니다.");
                  console.log("Content copied to clipboard");
                })
                .catch((error) => {
                  copyToClipboard(endResult)
                  console.error("Failed to copy: ", error);
                })
            }
          >
            copy
          </button>
        </div>
        <pre>{endResult}</pre>
      </div>
      
    </>
  );
}

export default App;
