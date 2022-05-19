import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AuthorsTable = (props) => {

    const [authors, setAuthors] = useState([]);
    const [flipFlop, setFlipFlop] = useState(true);

    useEffect(() => {
        if(flipFlop === true){
            axios.get("http://localhost:8000/api/authors")
                .then(res => {
                    console.log(res);
                    setAuthors(res.data.author);
                    setFlipFlop(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [flipFlop])

    useEffect(() => {
        setFlipFlop(false);
    }, [flipFlop]);

    function deleteAuthor (e, id){
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                console.log(res);
                setFlipFlop(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Link to="/new" />
            <p>We have quotes by:</p>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, i) => {
                        return (
                            <tr key={i}>
                                <td>{author.fullname}</td>
                                <td>
                                    <div>
                                        <Link to={`/edit/${author._id}`}>Edit</Link>
                                        <button onClick={(e) => deleteAuthor(e, author._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
};

export default AuthorsTable;