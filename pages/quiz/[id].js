/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuizPage({ extDB }) {
  return (
    <ThemeProvider theme={extDB.theme}>
      <QuizScreen
        externalQuestions={extDB.questions}
        externalBg={extDB.bg}
      />
    </ThemeProvider>
  // <pre style={{ color: 'black' }}>
  //   {JSON.stringify(extDB.questions, null, 4)}
  // </pre>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');

  try {
    const extDB = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
      .then((serverAnswer) => {
        if (serverAnswer.ok) {
          return serverAnswer.json();
        }
        throw new Error('Falha em carregar os dados');
      })
      .then((serverAnswerConverted) => serverAnswerConverted)
      .catch((err) => {
        console.log(err);
      });
    // console.log('extDB', extDB);
    // console.log('Infos NEXT', context.query.id);
    return {
      props: {
        extDB,
      },
    };
  } catch (err) {
    throw new Error(err);
    // context.res.
    // ...redirect
  }
}
