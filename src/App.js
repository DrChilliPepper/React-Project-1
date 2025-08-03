import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect} from 'react';
import AddItems from './AddItems';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'https://api.myjson.online/v1/records/d9f5a435-ac34-4bb4-8199-e8685a73d3e4';

  const [items, setitems] = useState([]);
  const [newitem, setnewitem] = useState('')
  const [search, setsearch] = useState('')
  const [fetcherror, setfetcherror] = useState(null);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    const fetchitems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not recieve expected data');
        const listitems = await response.json();
        console.log(listitems);
        setitems(listitems);
        setfetcherror(null);
      }
      catch (err){
        console.log(err.stack)
        setfetcherror(err.message);
      } finally {
        setisloading(false);
      }
    }

    (async () => await fetchitems())();
  }, [])

  const additem = async (item) => {
    const id = items.length ? items[items.length-1].id + 1 : 1
    const mynewitem = {
      id,
      checked: false,
      item
    };
    const listitems = [...items, mynewitem];
    setitems(listitems)
    
    const postoptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(mynewitem)
    }
    const result = await apiRequest(API_URL, postoptions);
    if (result) setfetcherror(result);
  }

  const handlecheck = async (id) => {
    const listitems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setitems(listitems);

    const myitem = listitems.filter((item) => item.id === id);
    const updateoptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myitem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateoptions);
    if (result) setfetcherror(result);
  }

  const handledelete = async (id) => {
    const listitems = items.filter((item) => item.id !== id);
    setitems(listitems);

    const deleteoptions = {method: 'DELETE'};
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteoptions);
    if (result) setfetcherror(result);
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!newitem) return;
    additem(newitem);
    setnewitem('')
  }

  return (
    <div className="App">
      <Header/>
      <AddItems
      newitem={newitem}
      setnewitem={setnewitem}
      handlesubmit={handlesubmit}
      />
      <SearchItem
      search={search}
      setsearch={setsearch}
      />
      <main>
        {isloading && <p>Loading items...</p>}
        {fetcherror && <p style={{color: "red"}}>{`Error: ${fetcherror}`}</p>}
        {!fetcherror && !isloading && <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handlecheck={handlecheck}
        handledelete={handledelete}
        />}
      </main>
      <Footer
      length={items.length}
      />
    </div>
  );
}

export default App;
