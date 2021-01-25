import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'
import Head from 'next/head';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:image" content={db.bg} />
        <title>{db.title}</title>
        <meta property="og:title" content={db.title} key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link rel="icon" type="image/png" href={db.icon} /> */}
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Quiz Da Bíblia</h1>
            </Widget.Header>
            <Widget.Content>            
              <p>Teste seus conhecimentos bíblicos!</p>            
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>            
              <h1>Quizes Da Galera</h1>
              <p>Outros quizes do pessoal da Imersão Alura!</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/epsilveira"/>
      </QuizBackground>
    </>
  );
}
