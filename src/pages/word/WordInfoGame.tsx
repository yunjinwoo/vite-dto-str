import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Dialog,
    Grid,
    Pagination,
    Paper,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchWordDefinition, WordDefinition } from "../../features/word/api";
import { getTotalWordCount, getWordsInfo, updateWordInfo } from "./supaWord";
import { WordMenu } from "./WordMenu";

const WordInfoGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { page = 1 } = location.state || {};

  const [gameWords, setGameWords] = useState<
    { word: string; definition?: WordDefinition; loading?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [findWord, setFindWord] = useState<{
    word: string;
    definition?: WordDefinition;
    loading?: boolean;
  }>({ word: "" });
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;

  //const { setWord, data } = useQueryWordDefinition();

  const findWordDefintion = async (word: string) => {
    console.log("findWordDefintion - word", word);
    const definition = await fetchWordDefinition(word);
    //setWord(word)
    setFindWord({ word, definition, loading: false });

    console.log("findWordDefintion - definition", definition);
    await updateWordInfo(word, {
      definition: definition?.meanings,
      partOfSpeech: "noun",
      example: "I ate an apple for lunch.",
    });

    setOpen(true);
  };

  useEffect(() => {
    const initializeGame = async () => {
      try {
        setLoading(true);

        // 총 단어 수 가져오기
        const totalCount = await getTotalWordCount();
        const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        // 현재 페이지의 단어 가져오기
        const words = await getWordsInfo(page, itemsPerPage);
        const formattedWords = words.map((word) => ({
          word: word.word,
          loading: false,
        }));
        setGameWords(formattedWords);
      } catch (error) {
        console.error("Error initializing game:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, [page]);

  if (loading) {
    return (
      <Container maxWidth="md" className="mt-8">
        <Paper elevation={3} className="p-8">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress />
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="mt-8">
      <Paper elevation={3} className="p-8">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">페이지: {page}</Typography>
          <WordMenu />
        </div>

        <Grid container spacing={2}>
          {gameWords.map((word, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="cursor-pointer hover:bg-gray-100 transition-colors">
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    onClick={() => findWordDefintion(word.word)}
                  >
                    {word.word}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              navigate("/word/home", { state: { page: value } });
            }}
          />
        </Box>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className="cursor-pointer hover:bg-gray-100 transition-colors">
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {findWord.word}
                </Typography>
                {findWord.loading ? (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress size={20} />
                  </Box>
                ) : findWord.definition ? (
                  <div>
                    {findWord.definition.meanings.map((meaning, idx) => (
                      <div key={idx} className="mt-2">
                        <Typography variant="subtitle2" color="primary">
                          {meaning.partOfSpeech}
                        </Typography>
                        <Typography variant="body2">
                          {meaning.definitions[0]?.definition}
                        </Typography>
                        {meaning.definitions[0]?.example && (
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            display="block"
                          >
                            예: {meaning.definitions[0].example}
                          </Typography>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography variant="body2" color="error">
                    단어 정의를 불러오지 못했습니다.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </Container>
  );
};

export default WordInfoGame;
