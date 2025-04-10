import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Help = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: '게임의 목적은 무엇인가요?',
      answer: '주어진 단어를 정확하게 입력하여 점수를 획득하는 게임입니다.',
    },
    {
      question: '점수는 어떻게 계산되나요?',
      answer: '정답을 맞출 때마다 10점을 획득합니다. 시간이 남을수록 추가 점수를 받을 수 있습니다.',
    },
    {
      question: '힌트는 어떻게 사용하나요?',
      answer: '게임 중 힌트 버튼을 클릭하면 단어에 대한 힌트를 볼 수 있습니다. 힌트는 게임당 3회까지 사용 가능합니다.',
    },
    {
      question: '난이도는 어떻게 선택하나요?',
      answer: '홈 화면에서 난이도를 선택할 수 있습니다. 쉬움, 보통, 어려움 중 선택 가능합니다.',
    },
  ];

  return (
    <Container maxWidth="md" className="mt-8">
      <Paper elevation={3} className="p-8">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          도움말
        </Typography>

        <Typography variant="h6" gutterBottom className="mt-4">
          게임 설명
        </Typography>
        <Typography paragraph>
          단어 게임은 주어진 단어를 정확하게 입력하여 점수를 획득하는 게임입니다.
          각 단어는 특정 카테고리와 난이도에 속하며, 정답을 맞출 때마다 점수를 얻습니다.
          시간 제한이 있으며, 힌트를 사용하여 도움을 받을 수 있습니다.
        </Typography>

        <Typography variant="h6" gutterBottom className="mt-4">
          자주 묻는 질문
        </Typography>
        <List>
          {faqs.map((faq, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={faq.question}
                  secondary={faq.answer}
                />
              </ListItem>
              {index < faqs.length - 1 && <Divider />}
            </div>
          ))}
        </List>

        <div className="mt-4 flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/word/home')}
          >
            홈으로
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Help; 