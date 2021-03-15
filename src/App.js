import './App.css';
import { gql, useQuery } from '@apollo/client';

const QUERY = gql`
  {
    rockets {
      name
      id
      description
      height {
        meters
      }
    }
    launchpads {
      id
      name
      details
    }
    launches {
      links {
        flickr_images
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header> 
      </header>
      <main>
        <h2>Rockets! 🚀 </h2>
        {data.rockets.map(r => <Rocket key={r.id} rocket={r} />)}
        <br></br>
        <h2>Launchpads! 🌎 </h2>
        {data.launchpads.map(lp => <Launchpads key={lp.id} launchpad={lp} />)}
      </main>
    </div>
  );
}

function Launchpads({ launchpad }) {
  return (
    <>
      <summary>{launchpad.name}</summary>
      <details>{launchpad.details}</details>
    </>
  )
}

function Rocket({ rocket }) {
  return (
    <>
      <summary>{rocket.name}</summary>
      <details>{rocket.description}</details>
    </>
  )
}

export default App;
