import React, { useContext, useEffect } from 'react'
import ArticleContext from '../conetxt/articles/articleContext'
import Articleitem from './ArticleItem';

const Articles = () => {
    const { articles, getArticle } = useContext(ArticleContext);
    useEffect(() => {
        getArticle();
    }, []);

    return (
        <>
            <div className="container row my-3">
                <h2>Articles</h2>
                {articles.map((article) => {
                    return <Articleitem key={article._id} article={article} isEditable={false} />
                })}
            </div>
        </>
    )
}

export default Articles