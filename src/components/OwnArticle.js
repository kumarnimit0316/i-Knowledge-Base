import React, { useContext, useEffect, useRef, useState } from 'react'
import ArticleContext from '../conetxt/articles/articleContext'
import Articleitem from './ArticleItem';
import AlertContext from '../conetxt/alert/alertContext';

const Articles = () => {
    const { ownArticles, getOwnArticle, editArticle } = useContext(ArticleContext);
    const { showAlert } = useContext(AlertContext);
    const [id, setId] = useState();
    const ref = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const tagRef = useRef(null);
    const updateArticle = async (article) => {
        ref.current.click();
        setId(article._id);
        if (titleRef.current) titleRef.current.value = article.title;
        if (descRef.current) descRef.current.value = article.description;
        if (tagRef.current) tagRef.current.value = article.tag;
    };
    const handleUpdateArticle = async (e) => {
        e.preventDefault();
        const updatedArticle = {
            _id: id,
            title: titleRef.current.value,
            description: descRef.current.value,
            tag: tagRef.current.value
        }
        const res = await editArticle(updatedArticle);
        if (res.success) showAlert({ type: "success", message: "Article edited successfully" });
        else showAlert({ type: "danger", message: "Error in editing article" });
        ref.current.click();
    };
    useEffect(() => {
        getOwnArticle();
    }, []);

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Article</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleUpdateArticle}>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" ref={titleRef} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="tag" ref={tagRef} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea rows={11} className="form-control" id="desc" ref={descRef} minLength={5} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" >Update Article</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Articles authored by you</h2>
                {ownArticles.map((article) => {
                    return <Articleitem key={article._id} article={article} updateArticle={updateArticle} isEditable={true} />
                })}
            </div>
        </>
    )
}

export default Articles