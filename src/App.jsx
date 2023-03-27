import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./App.css";
import CoinsTable from "./components/CoinsTable";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

function App() {
  const [page, setPage] = useState(0);

  async function fetchCoin(skip) {
    const { data } = await axios.get(
      `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10`
    );
    return data.coins;
  }

  const { data, isLoading, isError } = useQuery(
    ["coins", page],
    () => fetchCoin(page),

    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h3>Идет загрузка...</h3>;
  }

  if (isError) {
    return <h3>Ошибка при получении данных</h3>;
  }

  if (!data) {
    return <h3>Нет данных</h3>;
  }
  return (
    <div className="App">
      <Container style={{ marginTop: 30, maxWidth: 600 }}>
        <CoinsTable data={data} />
        <Button onClick={() => setPage((p) => p - 10)} disabled={!page}>
          Назад
        </Button>
        <Button onClick={() => setPage((p) => p + 10)} >
          Вперед
        </Button>
      </Container>
    </div>
  );
}

export default App;

/*

  const [coins, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchCoin() {
    try {
      const { data } = await axios.get(
        "https://api.coinstats.app/public/v1/coins?limit=10"
      );
      setCoin(data.coins);
      setLoading(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCoin();
  }, []);

  */
