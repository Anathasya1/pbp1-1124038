import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import NavBar from "../components/NavBar";
import { Box, Button, Card, CardContent, Container, DialogActions, DialogContent, Divider, Stack, TextField, Typography } from "@mui/material";


interface CreateMenuProps {
    onClose: () => void;
}

export default function CreateMenu({onClose} : CreateMenuProps) {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState("");
    const [size, setSize] = useState("");
    const [label, setLabel] = useState("");
    const [kategori, setKategori] = useState("");

    const addMenu = async () => {
        const status = "published"

        const res = await fetch("/api/list-menu", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                nama, deskripsi, harga, size, label, kategori, status
            }),
        })
        const data = await res.json();

        if (res.status !== 200) {
            alert("Error: " + data.message)
            return;
        }
    };

    // useEffect(() => {
    //     fetchPosts();
    // }, []); 

    return (
        <>
            <NavBar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>

                    {/* {userInfo && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsModalOpen(true)}>
                            + Tambah Post
                        </Button>
                    )} */}
                </Box>

                {/* <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                    Selamat Datang di Forum!
                </Typography> */}

                <DialogContent>
                <Stack spacing={3} mt={1}>
                    <TextField 
                        label="Nama Menu" 
                        fullWidth 
                        variant="outlined"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />
                    <TextField 
                        label="share deskripsi disini" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                    />
                    <TextField 
                        label="input harga" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                    />

                    <TextField 
                        label="input size" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />

                    <TextField 
                        label="input label" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />

                    <TextField 
                        label="input Kategori" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                    />
                </Stack>

            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={addMenu} variant="contained" color="primary">
                    create menu
                </Button>
            </DialogActions>

                <Divider sx={{ mb: 4 }} />

            </Container>
        </>
    )
}