import React, { useContext } from 'react'
import ArticleContext from '../conetxt/articles/articleContext';

const FullArticle = () => {
    const { particularArticles } = useContext(ArticleContext);
    return (
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{particularArticles.title}</h5>
                <p align='right' className="card-title">-{particularArticles.name}</p>
                <p className="card-text">{particularArticles.description}</p>
            </div>
        </div>
    )
}

export default FullArticle;
