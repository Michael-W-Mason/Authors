import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const AuthorForm = props => {

    const id = useParams();
    const [authorName, setAuthorName] = useState({
        fullname: ""
    });
    const [error, setError] = useState({
        msg: ""
    })
    const history = useHistory();

    useEffect(() => {
        if (id.id !== undefined) {
            axios.get(`http://localhost:8000/api/authors/${id.id}`)
                .then(res => {
                    console.log(res);
                    setAuthorName({
                        ...authorName,
                        fullname: res.data.author.fullname
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    function changeHandler(e) {
        e.preventDefault();
        setAuthorName({
            ...authorName,
            fullname: e.target.value
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        if (id.id !== undefined) {
            axios.put(`http://localhost:8000/api/authors/${id.id}`, { ...authorName })
                .then(res => {
                    console.log(res);
                    if(res.data.message !== undefined){
                        throw(res);
                    }
                    history.push("/");
                })
                .catch(err => {
                    console.log(err);
                    setError({...error, msg : err.data.error.message});
                });
        }
        else {
            axios.post(`http://localhost:8000/api/authors`, { ...authorName })
                .then(res => {
                    console.log(res);
                    if(res.data.message !== undefined){
                        throw(res);
                    }
                    history.push("/");
                })
                .catch(err => {
                    console.log(err);
                    setError({...error, msg : err.data.error.message});
                });
        }
    }

    return (
        <>
            <Link to="/">Home</Link>
            <p>{error.msg}</p>
            <form onSubmit={submitHandler}>
                <label htmlFor="fullname">Name:</label>
                <input type="text" name="fullname" defaultValue={authorName.fullname} onChange={changeHandler} />
                <Link to="/">Cancel</Link>
                <input type="submit" />
            </form>
        </>
    );
}

export default AuthorForm;