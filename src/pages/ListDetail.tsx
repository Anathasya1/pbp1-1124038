import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Menu } from "../types";
import NavBar from "../components/NavBar";
import "./css/ListDetail.css"

export default function ListDetail() {
    const { id } = useParams();
    const [menu, setMenu] = useState<Menu>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            // const token = localStorage.getItem('token');
            const response = await fetch(`/api/menu/${id}`, {
                headers: {
                    // "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            setMenu(data);
        }
        fetchPost();
    }, [id])

    const back = () => {
        navigate(-1); //balik ke satu halaman sebelumnya
    }

    if (!menu) {
        return <div>Loading..</div>
    }

    return (
        <>
            <NavBar />
            <div className="detail-wrapper">
                <div id="container">
                    <div className="post-title">Nama: {menu.nama}</div>
                    <div className="post-content">Deskripsi: {menu.deskripsi}</div>

                    <div style={{ marginTop: '20px' }}>
                        <button className="back-button" onClick={back}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}