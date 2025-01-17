import { Box, Button, Typography } from "@mui/material";
import Layout from "@widgets/Layout";
import Swal from "sweetalert2";
//import "sweetalert2/src/sweetalert2.scss";

const Index = () => (
  <Layout title="StrRegExp">
    <Typography>https://sweetalert2.github.io/#examples</Typography>
    <pre>SweetAlert2</pre>

    <Box>
      A basic message
      <Button onClick={() => Swal.fire("SweetAlert2 is working!")}>
        Try me!
      </Button>
    </Box>
    <Box>
      A title with a text under
      <Button
        onClick={() =>
          Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question",
          })
        }
      >
        Try me!
      </Button>
    </Box>

    <Box>
      Custom HTML description and buttons with ARIA labels
      <Button
        onClick={() =>
          Swal.fire({
            title: "<strong>HTML <u>example</u></strong>",
            icon: "info",
            html: `
    You can use <b>bold text</b>,
    <a href="#" autofocus>links</a>,
    and other HTML tags
  `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Great!
  `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
    <i class="fa fa-thumbs-down"></i>
  `,
            cancelButtonAriaLabel: "Thumbs down",
          })
        }
      >
        Try me!
      </Button>
    </Box>
  </Layout>
);

export default Index;
