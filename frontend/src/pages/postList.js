import { useEffect, useState } from "react";
import Post from "../components/post";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchPosts = async() => {
        const response = await axios.get('http://localhost:8000/api/posts');
        setPosts(response.data);
    }

	const fetchCategory = async() => {
        const response = await axios.get('http://localhost:8000/api/categories');
        setCategories(response.data);
    }

    useEffect(()=>{
        fetchPosts();
		fetchCategory();
    },[])


    return <>
	<main>
		<div className="container mt-4">
			<div className="row">
				<div className="col-lg-8">
					<h1 className="mb-4">Latest Posts</h1>
                    {
                        posts.map((post)=> <Post post={post}/>)
                    }
				</div>

				<div className="col-lg-4">
					<div className="card mb-4">
						<div className="card-body">
							<h5 className="card-title">About Me</h5>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>

					<div className="card mb-4">
						<div className="card-body">
							<h5 className="card-title">Categories</h5>
							<ul className="list-group">
								{categories.map(category => <li className="list-group-item"><Link to={`/posts/category/${category._id}`} className="text-black">{category.name}</Link></li>)}
							</ul>
						</div>
					</div>
				</div>
			</div>
    </div>
	</main>
    </>
}