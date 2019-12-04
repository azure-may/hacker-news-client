import React, { useState, useEffect } from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=react'
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      .then(data => {
        setNews(data.hits);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : '');

  const searchForm = () => (
    <form className='form-inline' onSubmit={handleSubmit}>
      <input className='form-control' type='text' onChange={handleChange} />
      <button className='btn btn-outline-info'>Search</button>
    </form>
  );

  const showNews = () =>
    news.map((news, index) => (
      <div>
        <h5 key={index}>{news.title}</h5>
        <p key={index + 100}>{news.url}</p>
      </div>
    ));

  useEffect(() => {
    fetchNews();
  }, [url]);

  return (
    <div className='container'>
      <h1>News</h1>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  );
};

export default App;
