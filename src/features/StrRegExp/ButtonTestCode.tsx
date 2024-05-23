import { Button } from "@mui/material";

function ButtonTestCode({ setTextCode }: { setTextCode: (str: string) => void }) {
  return <Button onClick={()=>setTextCode(TestCode)}>sample text</Button>;
}

export default ButtonTestCode;


const TestCode = `
@Data
@NoArgsConstructor
public class DeliverableResponseDto {

  @JsonAlias("projectNo")
  private String project_no;
  @JsonAlias("scopeName")
  private String scope_name;
  @JsonAlias("legacyDisciplineCode")
  private String legacy_discipline_code;
  @JsonAlias("documentNo")
  private String document_no;
  @JsonAlias("seclDocumentNo")
  private String secl_document_no;

    private List<DeliverableInterfaceDto> queryResult;
    private String offset;
    private String requestFailed;
    private String failureMessage;

}
`
