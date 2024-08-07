import TopbarEmp from "../topbarEmp/TopbarEmp";
import Sidebar from "../sidebar/Sidebar";
import Post from "../post/Post";
import "./home.css"
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomeEmp(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("https://sito-be.onrender.com/posts/privati");
                setPosts(res.data);
            } catch (err) {
                console.error("Errore nel recuperare i post dei privati", err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <TopbarEmp />
            <div className="feed">
                <Sidebar />
                <div className="feedWrapper">
                    {posts.map((post) => ( //map per iterare su array posts
                        <Post key={post._id} post={post} /> 
                    ))}
                </div>
            </div>
        </>
    );
}