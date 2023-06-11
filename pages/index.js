import Head from 'next/head';
import { Rebates } from '../components/Rebates/Rebates';
import { styled } from '@mui/material/styles';

const Home = () => {

  const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
  });

  return (
    <LayoutContainer>
        <Head>
          <title>
            CRUD APPLICATION WITH NEXTJS-GRAPHQL-MATERIAL UI-POSTGRESQL
          </title>
        </Head>
        <Rebates/>
    </LayoutContainer>

  );
}


export default Home;
