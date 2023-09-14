import React, { useState } from "react";
import ArticleContext from "./articleContext";

const ArticleState = (props) => {
    const host = "http://localhost:5000";
    const articleInitial = [];
    const [particularArticles, setParticularArticles] = useState(articleInitial);
    const [articles, setArticles] = useState(articleInitial);
    const [ownArticles, setOwnArticles] = useState(articleInitial);
    const getArticle = async () => {
        const response = await fetch(`${host}/api/articles/fetchallarticles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const res = await response.json();
        setArticles(res);
    }

    const getOwnArticle = async () => {
        const response = await fetch(`${host}/api/articles/fetchownarticles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const res = await response.json();
        setOwnArticles(res);
    }

    const addArticle = async (article) => {
        const { title, description, tag } = article;
        const response = await fetch(`${host}/api/articles/addarticle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const res = await response.json();
        setArticles(articles.concat(res.savedArticle));
        return res;
    }

    const deleteArticle = async (id) => {
        const response = await fetch(`${host}/api/articles/deletearticle/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const newArticles = articles.filter((article) => { return article._id !== id });
        setArticles(newArticles);
        const newOwnArticles = ownArticles.filter((article) => { return article._id !== id });
        setOwnArticles(newOwnArticles);
        const res = await response.json();
        return res;
    }

    const editArticle = async (updatedArticle) => {
        const { _id, title, description, tag } = updatedArticle;
        const response = await fetch(`${host}/api/articles/updatearticle/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const res = await response.json();
        setArticles((prevArticles) => prevArticles.map((article) => article._id === _id ? { ...article, ...updatedArticle } : article));
        return res;
    }

    return (
        <ArticleContext.Provider value={{ articles, ownArticles, particularArticles, setParticularArticles, addArticle, deleteArticle, editArticle, getArticle, getOwnArticle }}>
            {props.children}
        </ArticleContext.Provider>
    )
}

export default ArticleState;
