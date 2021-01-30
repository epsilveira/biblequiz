import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Button from '../src/components/Button';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <meta property="og:image" content={db.bg} />
        <title>{db.title}</title>
        <meta property="og:title" content={db.title} key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href={db.icon} />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0.1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz Da Bíblia</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste seus conhecimentos da Bíblia!</p>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                value={name}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                Vamos jogar!
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes Da Galera</h1>
            <ul>
              {db.external.map((externalLink) => {
                const [projectName, gitHubUser] = externalLink
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li>
                    {name.length === 0 ? (
                      <Widget.TopicDisabled>
                        {`${projectName}/${gitHubUser}`}
                      </Widget.TopicDisabled>

                    ) : (
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${gitHubUser}?name=${name}`}
                      >
                        {`${projectName}/${gitHubUser}`}
                      </Widget.Topic>
                    )}
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 2, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/epsilveira" />
    </QuizBackground>
  );
}
