import { gql, useQuery } from '@apollo/client';

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`

interface Lessons {
  id: string;
  title: string;
}

function App() {
  // para utilizar o apollo eh preciso colocar o ApolloProvider no main
  const { data } = useQuery<{ lessons: Lessons[] }>(GET_LESSONS_QUERY);

  return (
    // <h1 className="text-5xl" >Hello World</h1>
    <ul>
      {data?.lessons.map(lessons => {
        return <li key={lessons.id}>{lessons.title}</li>
      })}
    </ul>
  )
}

export default App

// substituido pelo useQuery
// useEffect(() => {
//   client.query({
//     query: GET_LESSONS_QUERY,
//   }).then(response => {
//     console.log(response.data);
//   });
// }, []);