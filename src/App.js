import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './componets/MovieRow';
import FeaturedMovie from './componets/FeaturedMovie';
import Header from './componets/Header';

export default () => {


  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  /*rolamento da netflix no top */
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista TOTAL
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //pegando o featured//
      let trending = list.filter(i => i.slug === 'trending');
      let randomChosen = Math.floor(Math.random() * (trending[0].items.results.length - 1));
      let chosen = trending[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);


  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />

        ))}
      </section>

      <footer>
        <small>&copy; Copyright 2021, FEITO POR MIN MESMO, SEM AUTORIZAÇÃO DA NETFLIX</small>
      </footer>
      
      {movieList.length <= 0 &&
      <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando"/>
      </div>
      }
    </div>

  );
}