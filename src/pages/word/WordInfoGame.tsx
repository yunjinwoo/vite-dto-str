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
import { getWordsWithInfo, getWordsWithInfoCount } from "./supaWord";
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
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const itemsPerPage = 15;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const findWordDefintion = async (word: string) => {
    console.log("findWordDefintion - word", word);
    const definition = await fetchWordDefinition(word);
    setFindWord({ word, definition, loading: false });
    setOpen(true);
  };

  useEffect(() => {
    const initializeGame = async () => {
      try {
        setLoading(true);

        // 단어 정보가 있는 단어들의 총 개수 가져오기
        const totalCount = await getWordsWithInfoCount();
        const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        // 단어 정보가 있는 단어들 가져오기
        const words = await getWordsWithInfo((page - 1) * itemsPerPage + 1, page * itemsPerPage);
        const formattedWords = words.map((word) => ({
          word: word.word,
          definition: word.word_info,
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

  // 단어를 첫 글자 기준으로 그룹화
  const groupedWords = gameWords.reduce((acc, word) => {
    const firstLetter = word.word.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(word);
    return acc;
  }, {} as Record<string, typeof gameWords>);

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
          <Typography variant="h5">단어 정보 페이지: {page}</Typography>
          <WordMenu />
        </div>

        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mb={4}>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "contained" : "outlined"}
              color="primary"
              onClick={() => setSelectedLetter(letter)}
              sx={{ minWidth: '40px' }}
            >
              {letter} ({groupedWords[letter]?.length || 0})
            </Button>
          ))}
        </Box>

        {selectedLetter ? (
          groupedWords[selectedLetter] ? (
            <div className="mb-6">
              <Typography variant="h6" className="mb-4" color="primary">
                {selectedLetter}
              </Typography>
              <Grid container spacing={2}>
                {groupedWords[selectedLetter].map((word, index) => (
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
                        {word.definition && (
                          <div className="mt-2">
                            {word.definition.meanings?.map((meaning: any, idx: number) => (
                              <div key={idx} className="mt-1">
                                <Typography variant="subtitle2" color="primary">
                                  {meaning.partOfSpeech}
                                </Typography>
                                <Typography variant="body2">
                                  {meaning.definitions[0]?.definition}
                                </Typography>
                                {meaning.definitions[0]?.example && (
                                  <Typography variant="caption" color="textSecondary" display="block">
                                    예: {meaning.definitions[0].example}
                                  </Typography>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              {selectedLetter}로 시작하는 단어가 없습니다.
            </Typography>
          )
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            알파벳을 선택해주세요.
          </Typography>
        )}

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              navigate("/word/info", { state: { page: value } });
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
                          <Typography variant="caption" color="textSecondary" display="block">
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
