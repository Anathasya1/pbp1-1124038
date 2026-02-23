import { useEffect, useMemo, useState } from "react";
import type { Menu } from '../types';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Container, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
// import NavBar from "../components/NavBar";
import { useNavigate } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import NavBar from "../components/NavBar";
// import PostModal from "../components/PostModal";
// import { useAppSelector } from "../hooks/useAppSelector";
// import './css/PostList.css';
// import NavBar from "../components/NavBar";
// import { useDeletePost } from "../hooks/useDeletePost";


export default function ListMenu() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [expandedId, setExpandedId] = useState<Record<string, boolean>>({});
    const [sortBy, setSortBy] = useState<string>();
    const [isSortAscending, setIsSortAscending] = useState<boolean>(true);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");

    const handleExpandClick = (id: string) => {
        setExpandedId((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const goToPost = (id: string) => {
        navigate(`/menu/${id}`);
    }

    const sortedPosts = useMemo(() => {

        let filteredResult = menus.filter((menu) => {
            const searchData = search.toLowerCase();
            return (
                menu.nama.toLowerCase().includes(searchData) ||
                menu.deskripsi.toLowerCase().includes(searchData)
            );
        })


        if (sortBy === undefined) {
            return filteredResult
        }
        const direction = isSortAscending ? 1 : -1;

        filteredResult.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.nama > b.nama ? direction : -direction;
                case 'createdAt':
                    return a.createdAt > b.createdAt ? direction : -direction;
                default:
                    return 0;
            }
        });

        return filteredResult;
    }, [menus, sortBy, isSortAscending, search]);

    const reloadPost = async () => {
        try {
            const response = await fetch('/api/list-menu');
            if (response.status === 200) {
                const data = await response.json();
                setMenus(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        reloadPost();
    }, []);

    return (
        <>
            <NavBar />

            <Container sx={{ py: 4 }}>
                <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>Post List</Typography>

                <div className="header-actions">
                    {/* <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by title or content..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div> */}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/create-menu')}>
                        + Tambah Post
                    </Button>

                    <div className="sort-container">
                        <button className="sort-button" onClick={() => { setSortBy('title'); setIsSortAscending(!isSortAscending); }}>
                            Sort by Title {sortBy === 'title' ? (isSortAscending ? '↑' : '↓') : ''}
                        </button>
                        <button className="sort-button" onClick={() => { setSortBy('createdAt'); setIsSortAscending(!isSortAscending); }}>
                            Sort by Date {sortBy === 'createdAt' ? (isSortAscending ? '↑' : '↓') : ''}
                        </button>
                        {/* mundur 1 halaman yg navigate -1 */}
                        <button className="sort-button" onClick={() => navigate(-1)}>
                            &larr; back
                        </button>
                    </div>
                </div>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                    {sortedPosts.map((menu) => (
                        <Card key={menu.id} sx={{ maxWidth: 600, width: '100%' }}>
                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: red[500] }}>{menu.nama.charAt(0).toUpperCase()}</Avatar>}
                                action={<IconButton><MoreVertIcon /></IconButton>}
                                title={menu.nama}
                                subheader={`${new Date(menu.createdAt).toLocaleDateString()}`}
                            />
                            <CardContent className="post-content-area">
                                <Typography variant="body2" className="post-description" sx={{ color: 'text.secondary' }}>{menu.deskripsi}</Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton><FavoriteIcon /></IconButton>
                                <IconButton><ShareIcon /></IconButton>
                                {/* {userInfo && post.userId === userInfo.id && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => {
                                            setSelectedPost(post);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button> */}


                                {/* )} */}

                                <button className="btn-detail" onClick={() => goToPost(menu.id)}>detail</button>

                                <IconButton
                                    className={`expand-more ${expandedId[menu.id] ? 'expanded' : 'collapsed'}`}
                                    onClick={() => handleExpandClick(menu.id)}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>

                            <Collapse in={expandedId[menu.id]} timeout="auto" unmountOnExit>
                                <CardContent sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                                    <Typography variant="caption" display="block">ID: {menu.id}</Typography>
                                    {/* <Typography variant="caption" display="block">Status: {menu.status}</Typography> */}
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}
                </Box>
            </Container>
        </>
    );
}