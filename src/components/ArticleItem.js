import React, { useContext } from 'react'
import ArticleContext from '../conetxt/articles/articleContext';
import AlertContext from '../conetxt/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Articleitem = (props) => {
    const { deleteArticle, setParticularArticles } = useContext(ArticleContext);
    const { article, updateArticle, isEditable } = props;
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const handleDelete = async () => {
        const res = await deleteArticle(article._id);
        if (res.success) showAlert({ type: "success", message: "Article deleted successfully" });
        else showAlert({ type: "danger", message: "Error in deleting article" });
    }
    return (
        <>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p align='right' className="card-title">-{article.name}</p>
                    <p className="card-text">{article.description.slice(0, 100)}....<button className="btn btn-link" onClick={() => { setParticularArticles(article); navigate('/readMore') }}>Read more</button></p>
                    <div className="d-flex align-items-center">
                        {isEditable && <i className="fa-solid fa-pen-to-square mx-2" style={{ color: "blue" }} onClick={() => { updateArticle(article) }}></i>}
                        {isEditable && <i className="fa-solid fa-trash-can mx-2" style={{ color: "red" }} onClick={handleDelete}></i>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Articleitem;