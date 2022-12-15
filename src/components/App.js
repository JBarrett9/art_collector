import { useEffect, useState } from "react";
import Content from "./content/content";
import Form from "./form/Form";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

import "../index.css";

const API_KEY = "207da37e-4a2e-429e-ae3b-1304c91e913a";

function App() {
  const [classifications, setClassifications] = useState([]);
  const [centuries, setCenturies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [classification, setClassification] = useState("");
  const [century, setCentury] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [currItem, setCurrItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mediums, setMediums] = useState({});
  const [medium, setMedium] = useState("");

  const fetchStuff = async (resourceType, setFun, lim = 100) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.harvardartmuseums.org/${resourceType}?apikey=${API_KEY}${
          keywords ? `&keyword="${keywords}"` : ""
        }${classification ? `&classification=${classification}` : ""}${
          century ? `&century=${century}` : ""
        }${medium ? `&medium=${medium}` : ""}&size=${lim}&page=1`
      );
      const data = await response.json();
      setFun(data.records);
      setPages(data.info.pages);
      setPage(data.info.page);
      setPrevPage(data.info.prev);
      setNextPage(data.info.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFromURL = async (url, setFun) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFun(data.records);
      setPages(data.info.pages);
      setPage(data.info.page);
      setPrevPage(data.info.prev);
      setNextPage(data.info.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFromParam = async (param, value, setFun) => {
    setIsLoading(true);
    try {
      console.log(
        `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&${param}=${value}&page=1`
      );
      const response = await fetch(
        `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&${param}=${value}&page=1`
      );
      const data = await response.json();
      setFun(data.records);
      setPages(data.info.pages);
      setPage(data.info.page);
      setPrevPage(data.info.prev);
      setNextPage(data.info.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMediums = async () => {
    try {
      const response = await fetch(
        "https://api.harvardartmuseums.org/medium?apikey=207da37e-4a2e-429e-ae3b-1304c91e913a&size=400"
      );
      const data = await response.json();
      const theGoods = data.records;
      let newMediums = {};
      for (let item of theGoods) {
        newMediums[item.name.toLowerCase()] = item.mediumid;
      }
      setMediums(newMediums);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStuff("classification", setClassifications);
    fetchStuff("century", setCenturies);
    fetchMediums();
  }, []);

  const generateList = () => {
    setPage(1);
    fetchStuff("object", setItems, 10);
  };

  return (
    <>
      <Header />
      <Form
        keywords={keywords}
        setKeywords={setKeywords}
        classifications={classifications}
        classification={classification}
        setClassification={setClassification}
        centuries={centuries}
        century={century}
        setCentury={setCentury}
        setPage={setPage}
        generateList={generateList}
        mediums={mediums}
        medium={medium}
        setMedium={setMedium}
      />
      <div className="main">
        <Sidebar
          items={items}
          page={page}
          setPage={setPage}
          pages={pages}
          fetchFromURL={fetchFromURL}
          nextPage={nextPage}
          prevPage={prevPage}
          setCurrItem={setCurrItem}
          setItems={setItems}
        />
        {isLoading ? <div id="spinner"></div> : <></>}
        <Content
          currItem={currItem}
          fetchFromParam={fetchFromParam}
          setItems={setItems}
          mediums={mediums}
        />
      </div>
    </>
  );
}

export default App;
