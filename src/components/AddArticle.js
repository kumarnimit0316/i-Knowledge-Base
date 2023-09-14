import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import ArticleContext from '../conetxt/articles/articleContext'
import AlertContext from '../conetxt/alert/alertContext';

const AddArticle = () => {
    const { addArticle } = useContext(ArticleContext);
    const { showAlert } = useContext(AlertContext);
    const title = useRef();
    const desc = useRef();
    const tag = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newArticle = {
            title: title.current.value,
            description: desc.current.value,
            tag: tag.current.value
        }
        const res = await addArticle(newArticle);
        if (res.success) {
            showAlert({ type: "success", message: "Article added successfully" });
            navigate('/ownArticle');
        }
        else showAlert({ type: "danger", message: "Error in adding article" });
        title.current.value = '';
        desc.current.value = '';
        tag.current.value = '';
    }
    return (
        <div className="container">
            <h1>Add a article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" ref={title} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" ref={tag} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <textarea className="form-control" rows={10} id="desc" ref={desc} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Article</button>
            </form>
        </div>
    )
}

export default AddArticle;
