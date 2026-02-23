export type Menu = {
    id: string,
    nama: string,
    deskripsi: string,
    harga: number,
    size: string,
    label: string,
    kategori: string,
    createdAt: string,
    updatedAt: string,
}


export type MenuListResponse = GenericListMenu<Menu>;

export type GenericListMenu<DataType> = {
    info: {
        count: number;
    },
    records: DataType[]
}

// export type PostResponse = Post;