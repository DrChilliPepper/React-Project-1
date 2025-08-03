import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect} from 'react';
import AddItems from './AddItems';
import SearchItem from './SearchItem';

function App() {

  const [items, setitems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || ['Tomato']);
  const [newitem, setnewitem] = useState('')
  const [search, setsearch] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items])

   const additems = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setitems(listItems);
  }

  const handlecheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setitems(listItems);
  }

  const handledelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setitems(listItems);
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!newitem) return;
    additems(newitem);
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
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handlecheck={handlecheck}
        handledelete={handledelete}
        />
      <Footer
      length={items.length}
      />
    </div>
  );
}

export default App;
