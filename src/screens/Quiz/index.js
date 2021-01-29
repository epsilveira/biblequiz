/* eslint-disable react/prop-types */
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
// import db from '../../../db.json';
import AlternativesForm from '../../components/AlternativesForm';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results, totalQuestions }) {
  const totalCorrect = results.filter((x) => x).length;
  const correctPercentage = ((totalCorrect / totalQuestions) * 100).toFixed(0);
  const router = useRouter();
  const { name } = router.query;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h1>
          Resultado de
          {' '}
          {name}
        </h1>
      </Widget.Header>

      <Widget.Content>
        {totalCorrect >= totalQuestions && (
          <>
            <h3>Parabéns! Você acertou todas as questões!</h3>
            <p>
              Testes seu conhecimentos com outro quiz =D
            </p>
          </>
        )}
        {correctPercentage >= 75 && correctPercentage < 100 && (
          <>
            <p>
              Parabéns! Você acertou
              {' '}
              {/* {results.reduce((actualSum, actualResult) => {
            if (actualResult === true) {
              return actualSum + 1;
            }
            return actualSum;
          }, 0)} */}
              {correctPercentage}
              % das questões, faltou pouco!
            </p>
            <ul>
              {results.map((result, index) => (
                <li key={`result__${result}`}>
                  Questão #
                  {index + 1}
                  :
                  {' '}
                  {result === true ? '✅' : '❌'}
                </li>
              ))}
            </ul>
          </>
        )}
        {correctPercentage >= 40 && correctPercentage < 75 && (
          <>
            <p>
              Você acertou
              {' '}
              {/* {results.reduce((actualSum, actualResult) => {
            if (actualResult === true) {
              return actualSum + 1;
            }
            return actualSum;
          }, 0)} */}
              {correctPercentage}
              % das questões. Tente novamente, dessa vez você consegue =D
            </p>
            <ul>
              {results.map((result, index) => (
                <li key={`result__${result}`}>
                  Questão #
                  {index + 1}
                  :
                  {' '}
                  {result === true ? '✅' : '❌'}
                </li>
              ))}
            </ul>
          </>
        )}
        {correctPercentage < 40 && (
          <>
            <p>
              Você acertou
              {' '}
              {/* {results.reduce((actualSum, actualResult) => {
            if (actualResult === true) {
              return actualSum + 1;
            }
            return actualSum;
          }, 0)} */}
              {correctPercentage}
              % das questões. Mas não fique triste,
              {' '}
              você pode tentar novamente e continuar aprendendo.
            </p>
            <ul>
              {results.map((result, index) => (
                <li key={`result__${result}`}>
                  Questão #
                  {index + 1}
                  :
                  {' '}
                  {result === true ? '✅' : '❌'}
                </li>
              ))}
            </ul>
          </>
        )}

      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
  // <Widget>
  //   <Widget.Header>
  //     Carregando...
  //   </Widget.Header>

    //   <Widget.Content>
    //     [Desafio do Loading]
    //   </Widget.Content>
    // </Widget>
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <ContentLoader
        speed={2}
        width={400}
        height={360}
        viewBox="0 0 400 360"
        backgroundColor="rgba(40,40,40,0.8)"
        foregroundColor="rgba(60,60,60, 0.8)"
      >
        <rect x="24" y="71" rx="2" ry="2" width="306" height="13" />
        <rect x="24" y="28" rx="0" ry="0" width="308" height="39" />
        <rect x="23" y="92" rx="0" ry="0" width="167" height="13" />
        <rect x="41" y="120" rx="0" ry="0" width="269" height="44" />
        <rect x="42" y="171" rx="0" ry="0" width="268" height="42" />
        <rect x="43" y="286" rx="0" ry="0" width="267" height="44" />
        <rect x="43" y="221" rx="0" ry="0" width="268" height="42" />
      </ContentLoader>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === (question.answer);
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const selectedAlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && selectedAlternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* Para mostrar em tela, ao invés do console.log */}
          {/* <pre>
          {JSON.stringify(question, null, 4)}
        </pre> */}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {/* {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>} */}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount
  }, []);
  // atualizado === willUpdate
  // morre === willUnmount

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
        <ResultWidget results={results} totalQuestions={totalQuestions} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
